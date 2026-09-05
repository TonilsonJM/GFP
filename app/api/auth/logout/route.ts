import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Criar response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout realizado com sucesso',
      },
      { status: 200 }
    );

    // Limpar cookie de autenticação diretamente na resposta
    response.cookies.delete('auth_token');

    console.log('✅ Logout realizado com sucesso');
    console.log('🍪 Cookie de autenticação removido');

    return response;
  } catch (err) {
    console.error('❌ Erro ao fazer logout:', err);
    return NextResponse.json(
      { error: 'Erro ao fazer logout' },
      { status: 500 }
    );
  }
}
