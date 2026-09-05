import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se email já existe
    const { data: existingUser, error: queryError } = await supabaseServer
      .from('users_accounts')
      .select('id')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (queryError) {
      console.error('❌ Erro ao verificar email:', queryError);
      return NextResponse.json(
        { error: 'Erro ao verificar email' },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      );
    }

    // Hash da senha
    const passwordHash = await hashPassword(password);

    // Inserir novo usuário
    const { data: newUser, error: insertError } = await supabaseServer
      .from('users_accounts')
      .insert({
        name,
        email: email.toLowerCase(),
        password_hash: passwordHash,
        plan: 'FREE', // Plano padrão
        status: 'ACTIVE',
      })
      .select()
      .single();

    if (insertError || !newUser) {
      console.error('❌ Erro ao inserir usuário:', insertError);
      return NextResponse.json(
        { error: 'Erro ao criar conta' },
        { status: 500 }
      );
    }

    // Criar token JWT
    const token = createToken(newUser.id, newUser.email);

    // Criar response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Conta criada com sucesso',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          plan: newUser.plan,
        },
      },
      { status: 201 }
    );

    // Configurar cookie de autenticação diretamente na resposta
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    console.log('✅ Conta criada com sucesso para:', email);
    console.log('🍪 Cookie de autenticação configurado');

    return response;
  } catch (err) {
    console.error('❌ Erro ao registrar:', err);
    return NextResponse.json(
      { error: 'Erro ao registrar' },
      { status: 500 }
    );
  }
}
