'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/lib/auth-actions'
import { HeartFlowerIllustration } from '@/components/ui/Illustrations'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-8 gradient-hero min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <HeartFlowerIllustration className="w-24 h-24 mx-auto mb-4 animate-float" />
          <h1 className="text-2xl font-bold text-gray-900">Bem-vinda de volta</h1>
          <p className="text-gray-500 text-sm mt-1">Entre na sua conta DaniCoiffer</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4" role="alert">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••"
              className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            aria-label="Entrar na conta"
            className="w-full gradient-pink text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-pink-200/50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-3">
          <Link href="/recuperar-senha" className="text-sm text-pink-600 hover:underline block font-medium">
            Esqueci minha senha
          </Link>
          <p className="text-sm text-gray-500">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-pink-600 font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
          <Link href="/" className="text-xs text-gray-400 hover:text-pink-500 block mt-4">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  )
}
