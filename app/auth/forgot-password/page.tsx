'use client';

import Link from 'next/link';

export default function ForgotPasswordPage() {

  return (
    <div className="max-w-md mx-auto">
      <div
        className="p-8 rounded-3xl"
        style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-3xl font-bold mb-2">Recuperar Senha</h1>
          <p className="text-slate-400">Insira seu email para receber um link de recuperação</p>
        </div>

        {/* Disabled Feature Message */}
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <p className="text-yellow-300 text-center font-medium">⚠️ Recurso temporariamente desabilitado</p>
          <p className="text-yellow-300/80 text-center text-sm mt-2">
            Essa funcionalidade está em manutenção. Por favor, tente novamente mais tarde.
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
          <p className="text-blue-300 text-center text-sm">
            💡 Se você esqueceu sua senha, entre em contato com nosso suporte
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-sm text-slate-400">ou</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Return Links */}
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="block w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium text-center hover:bg-white/20 transition-all"
          >
            ← Voltar para Login
          </Link>
          <Link
            href="/auth/register"
            className="block w-full py-3 rounded-lg bg-white/10 border border-white/20 text-white font-medium text-center hover:bg-white/20 transition-all"
          >
            📝 Criar Conta
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-xs text-slate-500 text-center mt-6">
          Problemas? Entre em contato com nosso suporte
        </p>
      </div>
    </div>
  );
}
