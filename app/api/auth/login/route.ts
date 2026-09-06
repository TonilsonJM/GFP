import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createToken } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log('🔐 [LOGIN] Iniciando processo de login');
    console.log('📧 Email recebido:', email);

    // Validação básica
    if (!email || !password) {
      console.warn('⚠️ [LOGIN] Validação falhou: email ou senha ausentes');
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    console.log('✓ [LOGIN] Validação básica passou');
    console.log('  Senha recebida:', password.length, 'caracteres');

    // Buscar usuário por email
    console.log('🔍 [LOGIN] Buscando usuário no banco de dados...');
    const { data: user, error: queryError } = await supabaseServer
      .from('users_accounts')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (queryError) {
      console.error('❌ [LOGIN] Erro ao buscar usuário:', queryError);
      return NextResponse.json(
        { error: 'Email ou senha inválido' },
        { status: 401 }
      );
    }

    if (!user) {
      console.log('❌ [LOGIN] Usuário não encontrado para email:', email);
      return NextResponse.json(
        { error: 'Email ou senha inválido' },
        { status: 401 }
      );
    }

    console.log('👤 [LOGIN] Usuário encontrado:', {
      id: user.id,
      email: user.email,
      name: user.name,
      status: user.status,
      password_hash_length: user.password_hash?.length || 'undefined',
      password_hash_preview: user.password_hash
        ? user.password_hash.substring(0, 20) + '...'
        : 'undefined',
    });

    // Verificar se usuário está ativo
    if (user.status !== 'ACTIVE') {
      console.warn('⚠️ [LOGIN] Usuário não está ativo. Status:', user.status);
      return NextResponse.json(
        { error: 'Conta desativada' },
        { status: 403 }
      );
    }

    console.log('✓ [LOGIN] Usuário está ativo');

    // Verificar senha
    console.log('🔑 [LOGIN] Verificando senha...');
    console.log('  Senha enviada:', password.length, 'caracteres');
    console.log('  Hash armazenado (primeiros 20 chars):', user.password_hash?.substring(0, 20) + '...');
    console.log('  Hash total length:', user.password_hash?.length || 'undefined');

    const isPasswordValid = await verifyPassword(password, user.password_hash);
    
    console.log('✓ [LOGIN] Resultado de verifyPassword:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.error('❌ [LOGIN] Senha não corresponde ao hash armazenado');
      console.log('  Hash esperado:', user.password_hash?.substring(0, 30) + '...');
      return NextResponse.json(
        { error: 'Email ou senha inválido' },
        { status: 401 }
      );
    }

    console.log('✓ [LOGIN] Senha verificada com sucesso');

    // Criar token JWT
    console.log('🎫 [LOGIN] Criando token JWT...');
    const token = createToken(user.id, user.email);
    console.log('✓ [LOGIN] Token JWT criado com sucesso');

    // Criar response e configurar cookie diretamente
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

    // Configurar cookie de autenticação diretamente na resposta
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 dias
      path: '/',
    });

    console.log('✅ [LOGIN] Login bem-sucedido para:', email);
    console.log('🍪 [LOGIN] Cookie de autenticação configurado');
    console.log('═══════════════════════════════════════════');

    return response;
  } catch (err) {
    console.error('❌ [LOGIN] Erro inesperado ao fazer login:', err);
    console.error('  Erro completo:', JSON.stringify(err, null, 2));
    return NextResponse.json(
      { error: 'Erro ao fazer login' },
      { status: 500 }
    );
  }
}
