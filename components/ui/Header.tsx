'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSession } from '@/lib/session-client'
import { logout as logoutAction } from '@/lib/auth-actions'

const navItems = [
  { href: '/', label: 'Início' },
  { href: '/agendar', label: 'Agendar' },
  { href: '/precos', label: 'Preços' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/#localizacao', label: 'Localização' },
]

interface UserInfo {
  name: string
  role: string
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user) {
        setUser({ name: session.user.name || '', role: session.user.role || 'cliente' })
      } else {
        setUser(null)
      }
    })
  }, [pathname])

  // Ocultar header apenas nas rotas exatas de auth e admin
  const isAuth = pathname === '/login' || pathname === '/cadastro' || pathname === '/recuperar-senha'
  const isAdmin = pathname.startsWith('/dashboard') || pathname.startsWith('/financeiro') || pathname.startsWith('/servicos') || pathname === '/agenda' || pathname.startsWith('/agenda/') || pathname.startsWith('/galeria-admin')
  if (isAuth || isAdmin) return null

  const isInternalPage = pathname !== '/'
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : ''

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-pink-100/50 sticky top-0 z-50" role="banner">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo + Voltar */}
        <div className="flex items-center gap-2 shrink-0">
          {isInternalPage && (
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  router.back()
                } else {
                  router.push('/')
                }
              }}
              aria-label="Voltar para página anterior"
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-50 transition-colors text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          )}
          <Link href="/" aria-label="DaniCoiffer - Página inicial" className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent hover:from-pink-700 hover:to-pink-600 transition-all">
            DaniCoiffer
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex items-center justify-center gap-1 overflow-x-auto" role="navigation" aria-label="Navegação principal">
          {navItems.map((item) => {
            const isAnchor = item.href.includes('#')
            const isActive = isAnchor ? false : pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                  isActive
                    ? 'gradient-pink text-white shadow-md shadow-pink-200/50'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User area */}
        <div className="shrink-0 relative">
          {user ? (
            <div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                aria-label="Menu do usuário"
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full pr-1"
              >
                <div className="w-9 h-9 rounded-full gradient-pink flex items-center justify-center shadow-md shadow-pink-200/50">
                  <span className="text-white text-xs font-bold">{initials}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {/* Dropdown */}
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-pink-100 py-2 w-48 z-50">
                    <div className="px-4 py-2 border-b border-pink-50">
                      <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                    </div>
                    <Link
                      href="/meus-agendamentos"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                    >
                      📅 Meus Agendamentos
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setShowMenu(false)}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
                      >
                        📊 Painel Admin
                      </Link>
                    )}
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        🚪 Sair
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="Entrar na conta"
              className="text-sm gradient-pink text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 shadow-md shadow-pink-200/50"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
