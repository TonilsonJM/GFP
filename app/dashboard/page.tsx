import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  // Verificar autenticação no servidor
  const user = await getAuthUser();

  if (!user) {
    console.log('❌ Usuário não autenticado - redirecionando para login');
    redirect('/auth/login');
  }

  console.log('✅ Dashboard carregado para usuário:', user.email);

  return <DashboardClient />;
}

