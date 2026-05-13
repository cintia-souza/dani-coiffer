import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Rotas protegidas de admin
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/servicos') || pathname.startsWith('/financeiro') || pathname === '/agenda' || pathname.startsWith('/agenda/') || pathname.startsWith('/galeria-admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/meus-agendamentos', req.url))
    }
  }

  // Rota protegida de cliente autenticado
  if (pathname.startsWith('/meus-agendamentos')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirecionar usuário logado que tenta acessar login/cadastro
  if ((pathname === '/login' || pathname === '/cadastro') && session?.user) {
    if (session.user.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.redirect(new URL('/meus-agendamentos', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/servicos/:path*', '/financeiro/:path*', '/agenda', '/agenda/:path*', '/galeria-admin/:path*', '/meus-agendamentos/:path*', '/login', '/cadastro'],
}
