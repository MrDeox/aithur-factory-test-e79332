'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Verification SaaS</h1>
                <p className="text-xs text-gray-500">e1ee</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Recursos</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Planos</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contato</a>
            </nav>

            {/* CTA Button */}
            <a
              href="https://test.com/pay"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Começar Agora
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Recursos</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Planos</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contato</a>
                <a
                  href="https://test.com/pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl"
                >
                  Começar Agora
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
                Verificação Técnica
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Automatizada</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Simplifique a validação de seus pipelines CI/CD, ETL e processos de dados. 
                Relatórios detalhados, conformidade garantida e monitoramento em tempo real.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://test.com/pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Experimente Grátis
                  <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                  Saiba Mais
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Monitoramento</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="w-8 h-8 bg-green-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-semibold">Pipeline CI/CD</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-semibold">ETL Jobs</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-semibold">Data Quality</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg mb-2"></div>
                    <div className="text-sm font-semibold">Compliance</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Todos OK</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos Poderosos</h2>
              <p className="text-xl text-gray-600">Tudo que você precisa para garantir a qualidade dos seus pipelines</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Validação Automática",
                  description: "Verificação inteligente de workflows, scripts e jobs em múltiplas plataformas.",
                  icon: "🔍"
                },
                {
                  title: "Relatórios Detalhados",
                  description: "Relatórios em PDF e HTML com métricas de qualidade e conformidade.",
                  icon: "📊"
                },
                {
                  title: "Monitoramento 24/7",
                  description: "Alertas em tempo real sobre falhas, inconsistências e melhorias.",
                  icon: "🚨"
                },
                {
                  title: "Integração Simples",
                  description: "API RESTful para integração com Jenkins, GitLab CI, GitHub Actions.",
                  icon: "🔗"
                },
                {
                  title: "Multi-Cloud",
                  description: "Suporte a AWS, Azure, GCP e ambientes on-premise.",
                  icon: "☁️"
                },
                {
                  title: "Segurança Avançada",
                  description: "Criptografia end-to-end e conformidade com LGPD e GDPR.",
                  icon: "🔒"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos Simples</h2>
              <p className="text-xl text-gray-600">Escolha o plano ideal para o seu time</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plano Básico */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Plano Básico</h3>
                  <div className="text-4xl font-bold text-gray-600 mb-2">R$ 97</div>
                  <div className="text-sm text-gray-500">por mês</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Até 10 pipelines",
                    "Relatórios semanais",
                    "Suporte por e-mail",
                    "Monitoramento básico",
                    "Integração com Git"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://test.com/pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Assinar Básico
                </a>
              </div>

              {/* Plano Pro */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="text-center mb-6">
                  <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">MAIS POPULAR</div>
                  <h3 className="text-2xl font-bold mb-2">Plano Pro</h3>
                  <div className="text-4xl font-bold mb-2">R$ 247</div>
                  <div className="text-sm text-blue-100">por mês</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Pipelines ilimitados",
                    "Relatórios em tempo real",
                    "Suporte prioritário",
                    "Integração avançada",
                    "Dashboard personalizado",
                    "Webhooks customizáveis"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-4 h-4 text-blue-200 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://test.com/pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Assinar Pro
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-4">Pronto para Transformar Seus Pipelines?</h2>
            <p className="text-xl text-blue-100 mb-8">Junte-se a mais de 100 empresas que já confiam na Verification SaaS</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://test.com/pay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Começar Agora
                <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Falar com Vendas
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Verification SaaS</h3>
                    <p className="text-gray-400 text-sm">e1ee</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Simplificando a verificação técnica de pipelines para empresas inovadoras no Brasil.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Produtos</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">CI/CD Validator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ETL Monitor</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Data Quality</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Compliance Check</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Empresa</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Suporte</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 Verification SaaS e1ee. Todos os direitos reservados.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacidade</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}