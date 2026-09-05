import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Limpar cookie de autenticação
    await clearAuthCookie();

    return NextResponse.json(
      {
        success: true,
        message: 'Logout realizado com sucesso',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    );
  }
}
