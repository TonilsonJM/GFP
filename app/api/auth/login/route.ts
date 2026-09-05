import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário por email
    const { data: user, error: queryError } = await supabaseServer
      .from('users_accounts')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (queryError || !user) {
      return NextResponse.json(
        { error: 'Email ou senha inválido' },
        { status: 401 }
      );
    }

    // Verificar se usuário está ativo
    if (user.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Conta desativada' },
        { status: 403 }
      );
    }

    // Verificar senha
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha inválido' },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = createToken(user.id, user.email);

    // Criar response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          plan: user.plan,
        },
      },
      { status: 200 }
    );

    // Salvar token em cookie
    await setAuthCookie(token);

    return response;
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
