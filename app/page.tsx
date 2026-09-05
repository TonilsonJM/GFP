'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1 - Blue */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            top: '-50px',
            right: '-50px',
            animation: 'blob 7s infinite',
          }}
        />
        {/* Blob 2 - Purple */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'rgba(168, 85, 247, 0.15)',
            bottom: '100px',
            left: '50px',
            animation: 'blob 9s infinite 1s',
          }}
        />
        {/* Blob 3 - Pink */}
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'rgba(236, 72, 153, 0.15)',
            top: '300px',
            right: '100px',
            animation: 'blob 11s infinite 2s',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80" style={{
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FinJM
            </span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Funcionalidades
            </a>
            <a
              href="#benefits"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              Benefícios
            </a>
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-sm font-medium transition-all"
            >
              🔐 Entrar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                onClick={closeMobileMenu}
                className="block px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Funcionalidades
              </a>
              <a
                href="#benefits"
                onClick={closeMobileMenu}
                className="block px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                Benefícios
              </a>
              <Link
                href="/auth/login"
                onClick={closeMobileMenu}
                className="block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-center font-medium transition-all"
              >
                🔐 Entrar
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col items-center text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Icon */}
            <div className="mb-6 animate-bounce" style={{
              animationDuration: '3s',
            }}>
              <span className="text-7xl sm:text-8xl inline-block">💰</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Controle Suas Finanças,
              </span>
              <br />
              <span className="text-white">Realize Seus Sonhos</span>
            </h1>

            {/* Subheader */}
            <p className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
              Gerencie suas finanças com inteligência artificial. Acompanhe despesas, organize orçamentos e atinja seus objetivos financeiros com facilidade.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register" className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 inline-block text-center">
                🚀 Começar Gratuitamente
              </Link>
              <Link href="/auth/login" className="px-8 py-3 rounded-full border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500/10 font-semibold transition-all inline-block text-center">
                🔐 Fazer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Por que escolher FinJM?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className={`p-8 rounded-2xl transition-all duration-700 transform ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Seguro & Confiável</h3>
              <p className="text-slate-400">
                Seus dados são protegidos com criptografia de ponta a ponta. Privacidade garantida.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className={`p-8 rounded-2xl transition-all duration-700 transform delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Rápido & Eficiente</h3>
              <p className="text-slate-400">
                Interface intuitiva que você domina em minutos. Controle tudo de forma ágil.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className={`p-8 rounded-2xl transition-all duration-700 transform delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Inteligente & Poderoso</h3>
              <p className="text-slate-400">
                Relatórios AI que insights valiosos. Tome decisões financeiras baseadas em dados.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div
            className="p-10 sm:p-12 rounded-3xl"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
              Benefícios que Transformam
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="flex gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Economia Automática</h3>
                  <p className="text-slate-400">
                    Poupe automaticamente a cada transação com nossas metas inteligentes.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Alertas Inteligentes</h3>
                  <p className="text-slate-400">
                    Receba notificações sobre gastos anormais e oportunidades de economia.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Relatórios Detalhados</h3>
                  <p className="text-slate-400">
                    Visualize seu comportamento financeiro com gráficos avançados e insights.
                  </p>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="flex gap-4">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Suporte 24/7</h3>
                  <p className="text-slate-400">
                    Nossa equipe está sempre pronta para ajudar você a atingir seus objetivos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="p-12 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Pronto para Transformar?
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Comece sua jornada financeira agora. Sem cartão de crédito necessário.
            </p>
            <Link href="/auth/register" className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg transition-all hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105">
              Começar Agora 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-4">
                <span className="text-2xl">💰</span>
                <span className="text-lg font-bold">FinJM</span>
              </div>
            </div>
            <div className="flex gap-6 justify-center">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacidade
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Termos
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Contato
              </a>
            </div>
            <div className="text-slate-400 text-sm text-center sm:text-right">
              © 2026 FinJM. Todos os direitos reservados por TonilsonJM.
            </div>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
