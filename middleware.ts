import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Rotas públicas (não requerem autenticação)
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/'];

  // Se é rota pública, deixa passar
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Para rotas protegidas, verificar token
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    // Redirecionar para login se não houver token
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Verificar se token é válido
  const decoded = verifyToken(token);
  if (!decoded) {
    // Token inválido ou expirado
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('auth_token');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
