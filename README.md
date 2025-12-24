# Verification SaaS e1ee

**Niche:** Micro-SaaS de Verificação Técnica de Pipeline
**Localização:** Brasil
**Tecnologias:** Next.js + Tailwind CSS (Frontend), FastAPI (Backend)

## 🎯 Visão Geral

O **Verification SaaS e1ee** é um micro-serviço especializado na verificação e validação automatizada de pipelines técnicos (CI/CD, ETL, Data Processing). Ele oferece relatórios detalhados, validação de conformidade e monitoramento contínuo para equipes de desenvolvimento e DevOps.

## 🚀 Principais Funcionalidades

- **Validação de Pipelines:** Verificação automatizada de workflows, scripts e jobs.
- **Relatórios de Conformidade:** Geração de relatórios detalhados em PDF/HTML.
- **Monitoramento em Tempo Real:** Alertas e notificações sobre falhas ou inconsistências.
- **Integração Simplificada:** API RESTful para integração com ferramentas como Jenkins, GitLab CI, GitHub Actions.

## 💰 Planos de Assinatura (BRL)

- **Plano Básico:** R$ 97/mês
  - Até 10 pipelines
  - Relatórios semanais
  - Suporte por e-mail

- **Plano Pro:** R$ 247/mês
  - Pipelines ilimitados
  - Relatórios em tempo real
  - Suporte prioritário
  - Integração avançada

## 🛠️ Tecnologias

### Frontend (Landing Page)
- **Next.js 14** (App Router)
- **Tailwind CSS** (Design responsivo)
- **TypeScript** (Tipagem segura)
- **Locales:** Português (pt-BR)

### Backend (API)
- **FastAPI** (Python)
- **Pydantic** (Validação de dados)
- **Mercado Pago SDK** (Pagamentos)

## 💳 Integração com Mercado Pago

- Checkout transparente via API
- Suporte a cartões, boleto e Pix
- Webhooks para atualização de status

## 📁 Estrutura de Arquivos

```
verification-saas-e1ee/
├── README.md              # Documentação do projeto
├── app/
│   └── page.tsx          # Landing page (Next.js)
├── api/
│   └── main.py           # FastAPI (Backend)
└── .env.example          # Variáveis de ambiente
```

## 🚀 Como Executar

### Frontend (Landing Page)
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar: http://localhost:3000
```

### Backend (API)
```bash
# Instalar dependências Python
pip install fastapi uvicorn mercadopago

# Iniciar servidor FastAPI
uvicorn api.main:app --reload --port 8000

# Acessar: http://localhost:8000/docs
```

## 🔐 Variáveis de Ambiente (.env)

```bash
# Mercado Pago
MP_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
MP_PUBLIC_KEY=YOUR_PUBLIC_KEY
MP_WEBHOOK_URL=https://your-domain.com/api/webhook/mp

# FastAPI
API_HOST=0.0.0.0
API_PORT=8000

# Database (exemplo)
DATABASE_URL=sqlite:///./test.db
```

## 📞 Contato

- **E-mail:** contato@verificationsaas.com.br
- **Site:** https://verificationsaas.com.br
- **Suporte:** Suporte 24/7 via chat interno

---

**Nota:** Este é um projeto de Micro-SaaS focado no mercado brasileiro. Todas as interfaces e comunicações são em português.