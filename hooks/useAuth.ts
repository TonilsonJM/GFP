/**
 * Hook para acessar informações de autenticação
 * Para usar em componentes cliente
 */

import { useEffect, useState } from 'react';

interface AuthUser {
  userId: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esta função seria chamada para verificar se o usuário está autenticado
    // Por enquanto, apenas marca como não carregando
    // Em uma implementação completa, você buscaria de uma API ou context
    setLoading(false);
  }, []);

  return { user, loading };
}

/**
 * Exemplo de uso em um componente:
 *
 * 'use client';
 * 
 * import { useAuth } from '@/hooks/useAuth';
 *
 * export function ProfileComponent() {
 *   const { user, loading } = useAuth();
 *
 *   if (loading) return <div>Carregando...</div>;
 *   if (!user) return <div>Não autenticado</div>;
 *
 *   return <div>Bem-vindo, {user.email}!</div>;
 * }
 */
