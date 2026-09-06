'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/authClient';

export default function DashboardClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'rgba(59, 130, 246, 0.15)',
            top: '-50px',
            right: '-50px',
            animation: 'blob 7s infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'rgba(168, 85, 247, 0.15)',
            bottom: '100px',
            left: '50px',
            animation: 'blob 9s infinite 1s',
          }}
        />
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
          <Link href="/dashboard" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FinJM
            </span>
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-full border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500/10 font-semibold transition-all text-sm">
              👤 Perfil
            </button>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all text-sm disabled:opacity-50"
            >
              {loading ? 'Saindo...' : 'Sair'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div
            className="p-12 rounded-3xl mb-12"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h1 className="text-4xl font-bold mb-4">
              Bem-vindo ao seu Dashboard! 👋
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Gerencie suas finanças de forma inteligente e alcance seus objetivos financeiros com FinJM.
            </p>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Stat 1 */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                <p className="text-slate-400 mb-2">Saldo Total</p>
                <p className="text-3xl font-bold text-green-400">Kz 0,00</p>
                <p className="text-sm text-slate-500 mt-2">📈 Nenhuma transação ainda</p>
              </div>

              {/* Stat 2 */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                <p className="text-slate-400 mb-2">Despesas do Mês</p>
                <p className="text-3xl font-bold text-red-400">Kz 0,00</p>
                <p className="text-sm text-slate-500 mt-2">📊 Sem gastos registrados</p>
              </div>

              {/* Stat 3 */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(30, 41, 59, 0.5)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                <p className="text-slate-400 mb-2">Metas</p>
                <p className="text-3xl font-bold text-blue-400">0</p>
                <p className="text-sm text-slate-500 mt-2">🎯 Crie suas primeiras metas</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature Card 1 */}
            <div
              className="p-8 rounded-2xl hover:translate-y-1 transition-transform"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Analisar Transações</h3>
              <p className="text-slate-400 mb-6">
                Visualize todas as suas transações e categorias em um único lugar.
              </p>
              <button className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 transition-colors">
                Ir para Transações →
              </button>
            </div>

            {/* Feature Card 2 */}
            <div
              className="p-8 rounded-2xl hover:translate-y-1 transition-transform"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Definir Metas</h3>
              <p className="text-slate-400 mb-6">
                Crie e acompanhe metas de economia e invista em seu futuro.
              </p>
              <button className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 transition-colors">
                Criar Meta →
              </button>
            </div>

            {/* Feature Card 3 */}
            <div
              className="p-8 rounded-2xl hover:translate-y-1 transition-transform"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-3">Gerenciar Carteiras</h3>
              <p className="text-slate-400 mb-6">
                Organize suas contas e acompanhe seus saldos em tempo real.
              </p>
              <button className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 transition-colors">
                Gerenciar Carteiras →
              </button>
            </div>

            {/* Feature Card 4 */}
            <div
              className="p-8 rounded-2xl hover:translate-y-1 transition-transform"
              style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">Relatórios Inteligentes</h3>
              <p className="text-slate-400 mb-6">
                Receba insights baseados em IA sobre seus hábitos financeiros.
              </p>
              <button className="px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-300 hover:bg-purple-500/30 transition-colors">
                Ver Relatórios →
              </button>
            </div>
          </div>

          {/* Upcoming Features */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p className="text-slate-400 mb-4">
              💡 Dica: Mais funcionalidades estão sendo desenvolvidas. Fique atento às atualizações!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 rounded-full border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500/10 font-semibold transition-all"
            >
              Voltar à Homepage
            </Link>
          </div>
        </div>
      </main>

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
      `}</style>
    </div>
  );
}
