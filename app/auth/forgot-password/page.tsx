'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim()) {
      setError('Email é obrigatório');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(true);
        setEmail('');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar email de recuperação';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-300 text-center font-medium">✅ Email enviado com sucesso!</p>
            <p className="text-green-300/80 text-center text-sm mt-2">
              Verifique seu email para o link de recuperação de senha
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
            ❌ {error}
          </div>
        )}

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:bg-white/15 transition-all disabled:opacity-50"
                disabled={loading}
                required
              />
              <p className="text-xs text-slate-400 mt-2">
                Enviaremos um link de recuperação para este email
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? '⏳ Enviando...' : 'Enviar Link 📧'}
            </button>
          </form>
        ) : (
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-lg">
            <p className="text-blue-300 text-center text-sm">
              💡 Não recebeu? Verifique a pasta de spam ou tente novamente
            </p>
          </div>
        )}

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
