'use client';

import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
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
          <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-2xl">💰</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FinJM
            </span>
          </Link>

          {/* Back Button */}
          <Link
            href="/"
            className="px-4 py-2 rounded-full border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-500/10 font-semibold transition-all"
          >
            ← Voltar
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        {children}
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
