'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/lib/auth-actions'

const adminNav = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/agenda', label: 'Agenda', icon: '📅' },
  { href: '/servicos', label: 'Serviços', icon: '💇' },
  { href: '/galeria-admin', label: 'Galeria', icon: '📸' },
  { href: '/financeiro', label: 'Financeiro', icon: '💰' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex flex-col md:flex-row min-h-full">
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-pink-100 sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back()
              } else {
                router.push('/')
              }
            }}
            aria-label="Voltar"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-pink-50 text-pink-600"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <Link href="/dashboard" className="text-lg font-bold text-pink-600">
            DaniCoiffer
          </Link>
        </div>
        <form action={logout}>
          <button type="submit" aria-label="Sair" className="text-sm text-gray-400 hover:text-pink-500">
            Sair
          </button>
        </form>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 bg-white border-r border-pink-100 flex-col sticky top-0 h-screen" role="navigation" aria-label="Menu administrativo">
        <div className="p-4 border-b border-pink-100">
          <Link href="/dashboard" className="text-lg font-bold text-pink-600" aria-label="DaniCoiffer Admin">
            DaniCoiffer
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">Painel Admin</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                pathname === item.href
                  ? 'bg-pink-600 text-white'
                  : 'text-gray-700 hover:bg-pink-50 hover:text-pink-700'
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-pink-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors mb-1"
            aria-label="Ver site público"
          >
            <span aria-hidden="true">🌐</span> Ver Site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              aria-label="Sair da conta"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <span aria-hidden="true">🚪</span> Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-50 min-h-screen pb-20 md:pb-6" role="main">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 flex z-50" role="navigation" aria-label="Menu administrativo mobile">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? 'page' : undefined}
            className={`flex-1 flex flex-col items-center py-2.5 text-xs font-medium transition-colors ${
              pathname === item.href ? 'text-pink-600' : 'text-gray-400'
            }`}
          >
            <span className="text-lg mb-0.5" aria-hidden="true">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
