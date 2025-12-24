from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
import logging
from dotenv import load_dotenv
from datetime import datetime, timedelta
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Verification SaaS e1ee API",
    description="API para validação e monitoramento de pipelines técnicos",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if os.getenv("ENV") == "development" else ["https://verificationsaas.com.br"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mercado Pago Integration
try:
    import mercadopago
    mp = mercadopago.SDK(os.getenv("MP_ACCESS_TOKEN"))
    logger.info("Mercado Pago SDK initialized")
except Exception as e:
    logger.error(f"Mercado Pago initialization failed: {e}")
    mp = None

# Models
class Pipeline(BaseModel):
    id: str = Field(..., description="Unique pipeline identifier")
    name: str = Field(..., min_length=3, max_length=100)
    type: str = Field(..., description="Type: cicd, etl, data_processing")
    url: str = Field(..., description="Pipeline URL or repository link")
    status: str = Field(default="active", description="Pipeline status")
    created_at: datetime = Field(default_factory=datetime.now)
    last_check: Optional[datetime] = None
    checks: List[Dict[str, Any]] = Field(default=[])

class ValidationResult(BaseModel):
    pipeline_id: str
    status: str  # passed, failed, warning
    checks: List[Dict[str, Any]]
    score: float  # 0-100
    generated_at: datetime = Field(default_factory=datetime.now)

class PaymentRequest(BaseModel):
    plan: str  # basic, pro
    email: str
    name: str
    document: str  # CPF/CNPJ

# In-memory storage (replace with database in production)
pipelines_db: Dict[str, Pipeline] = {}
results_db: Dict[str, List[ValidationResult]] = {}

@app.on_event("startup")
async def startup_event():
    logger.info("Verification SaaS API started")
    # Initialize sample data
    if not pipelines_db:
        sample_pipelines = [
            Pipeline(id="p1", name="CI/CD Pipeline", type="cicd", url="https://github.com/example/ci-cd", status="active"),
            Pipeline(id="p2", name="ETL Job", type="etl", url="https://airflow.example.com/dag/etl", status="active"),
            Pipeline(id="p3", name="Data Processing", type="data_processing", url="https://spark.example.com/jobs/data", status="active")
        ]
        for pipeline in sample_pipelines:
            pipelines_db[pipeline.id] = pipeline

@app.get("/")
async def root():
    return {
        "message": "Verification SaaS e1ee API",
        "version": "1.0.0",
        "environment": os.getenv("ENV", "development"),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "verification-saas-api",
        "timestamp": datetime.now().isoformat()
    }

# Pipeline Management
@app.post("/api/pipelines", response_model=Pipeline)
async def create_pipeline(pipeline: Pipeline):
    """Create a new pipeline for validation"""
    if pipeline.id in pipelines_db:
        raise HTTPException(status_code=400, detail="Pipeline already exists")
    
    pipelines_db[pipeline.id] = pipeline
    logger.info(f"Pipeline created: {pipeline.id}")
    return pipeline

@app.get("/api/pipelines", response_model=List[Pipeline])
async def get_pipelines():
    """Get all pipelines"""
    return list(pipelines_db.values())

@app.get("/api/pipelines/{pipeline_id}", response_model=Pipeline)
async def get_pipeline(pipeline_id: str):
    """Get pipeline by ID"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    return pipelines_db[pipeline_id]

@app.put("/api/pipelines/{pipeline_id}")
async def update_pipeline(pipeline_id: str, pipeline: Pipeline):
    """Update pipeline configuration"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    pipeline.id = pipeline_id  # Prevent ID change
    pipelines_db[pipeline_id] = pipeline
    logger.info(f"Pipeline updated: {pipeline_id}")
    return {"message": "Pipeline updated successfully"}

@app.delete("/api/pipelines/{pipeline_id}")
async def delete_pipeline(pipeline_id: str):
    """Delete pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    del pipelines_db[pipeline_id]
    if pipeline_id in results_db:
        del results_db[pipeline_id]
    
    logger.info(f"Pipeline deleted: {pipeline_id}")
    return {"message": "Pipeline deleted successfully"}

# Validation
@app.post("/api/pipelines/{pipeline_id}/validate", response_model=ValidationResult)
async def validate_pipeline(background_tasks: BackgroundTasks, pipeline_id: str):
    """Trigger pipeline validation"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    # Schedule validation in background
    background_tasks.add_task(run_validation, pipeline_id)
    
    return {
        "pipeline_id": pipeline_id,
        "status": "running",
        "checks": [],
        "score": 0,
        "generated_at": datetime.now()
    }

@app.get("/api/pipelines/{pipeline_id}/results", response_model=List[ValidationResult])
async def get_validation_results(pipeline_id: str, limit: int = 10):
    """Get validation results for pipeline"""
    if pipeline_id not in pipelines_db:
        raise HTTPException(status_code=404, detail="Pipeline not found")
    
    results = results_db.get(pipeline_id, [])
    return results[-limit:]  # Return last N results

@app.get("/api/results/{result_id}", response_model=ValidationResult)
async def get_validation_result(result_id: str):
    """Get specific validation result"""
    # This would require storing results with unique IDs
    # For now, return the latest result
    for pipeline_id, results in results_db.items():
        if results:
            return results[-1]
    
    raise HTTPException(status_code=404, detail="Result not found")

# Payments
@app.post("/api/payments/create")
async def create_payment(payment_request: PaymentRequest):
    """Create Mercado Pago payment"""
    if not mp:
        raise HTTPException(status_code=500, detail="Payment service unavailable")
    
    try:
        plan_amounts = {
            "basic": 97.00,
            "pro": 247.00
        }
        
        if payment_request.plan not in plan_amounts:
            raise HTTPException(status_code=400, detail="Invalid plan")
        
        preference_data = {
            "items": [
                {
                    "title": f"Plano {payment_request.plan.title()}",
                    "quantity": 1,
                    "currency_id": "BRL",
                    "unit_price": plan_amounts[payment_request.plan]
                }
            ],
            "payer": {
                "email": payment_request.email,
                "first_name": payment_request.name.split()[0],
                "last_name": " ".join(payment_request.name.split()[1:]),
                "identification": {
                    "type": "CPF" if len(payment_request.document) == 11 else "CNPJ",
                    "number": payment_request.document
                }
            },
            "back_urls": {
                "success": "https://verificationsaas.com.br/success",
                "failure": "https://verificationsaas.com.br/failure",
                "pending": "https://verificationsaas.com.br/pending"
            },
            "auto_return": "approved",
            "notification_url": os.getenv("MP_WEBHOOK_URL")
        }
        
        preference_response = mp.preference().create(preference_data)
        preference = preference_response["response"]
        
        logger.info(f"Payment created for {payment_request.email}: {preference['id']}")
        
        return {
            "payment_id": preference["id"],
            "init_point": preference["init_point"],
            "sandbox_init_point": preference["sandbox_init_point"]
        }
        
    except Exception as e:
        logger.error(f"Payment creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create payment")

@app.post("/api/webhook/mp")
async def mercadopago_webhook(request: Request):
    """Mercado Pago webhook handler"""
    try:
        payload = await request.json()
        logger.info(f"Webhook received: {payload}")
        
        # Process payment status
        if "data" in payload and "id" in payload["data"]:
            payment_id = payload["data"]["id"]
            
            # Get payment details
            if mp:
                payment_info = mp.payment().get(payment_id)
                status = payment_info["response"]["status"]
                
                logger.info(f"Payment {payment_id} status: {status}")
                
                # Update subscription status based on payment
                if status == "approved":
                    # Activate subscription
                    pass
                elif status in ["cancelled", "refunded"]:
                    # Cancel subscription
                    pass
        
        return {"status": "received"}
        
    except Exception as e:
        logger.error(f"Webhook processing failed: {e}")
        return {"status": "error", "message": str(e)}

@app.get("/api/webhook/mp/ipn")
async def mercadopago_ipn(request: Request):
    """IPN endpoint for older Mercado Pago integrations"""
    query_params = dict(request.query_params)
    logger.info(f"IPN received: {query_params}")
    return {"status": "received"}

# Background Tasks
async def run_validation(pipeline_id: str):
    """Background task to run pipeline validation"""
    try:
        logger.info(f"Starting validation for pipeline: {pipeline_id}")
        
        # Simulate validation checks
        checks = [
            {
                "name": "CI/CD Workflow",
                "status": "passed",
                "details": "All stages completed successfully",
                "score": 100
            },
            {
                "name": "Security Scan",
                "status": "passed",
                "details": "No vulnerabilities found",
                "score": 95
            },
            {
                "name": "Performance Test",
                "status": "warning",
                "details": "Some tests exceeded time limits",
                "score": 85
            },
            {
                "name": "Code Quality",
                "status": "passed",
                "details": "All quality gates passed",
                "score": 92
            }
        ]
        
        # Calculate overall score
        total_score = sum(check["score"] for check in checks)
        avg_score = total_score / len(checks)
        
        # Determine overall status
        if avg_score >= 90:
            status = "passed"
        elif avg_score >= 70:
            status = "warning"
        else:
            status = "failed"
        
        result = ValidationResult(
            pipeline_id=pipeline_id,
            status=status,
            checks=checks,
            score=avg_score
        )
        
        # Store result
        if pipeline_id not in results_db:
            results_db[pipeline_id] = []
        results_db[pipeline_id].append(result)
        
        # Update pipeline last_check
        if pipeline_id in pipelines_db:
            pipelines_db[pipeline_id].last_check = datetime.now()
        
        logger.info(f"Validation completed for {pipeline_id}: {status}, score: {avg_score}")
        
    except Exception as e:
        logger.error(f"Validation failed for {pipeline_id}: {e}")

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "timestamp": datetime.now().isoformat()
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Internal server error",
            "timestamp": datetime.now().isoformat()
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=os.getenv("ENV") == "development"
    )