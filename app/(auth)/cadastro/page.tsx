'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/lib/auth-actions'
import { SpaIllustration } from '@/components/ui/Illustrations'

export default function CadastroPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    const result = await signup(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-8 gradient-hero min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <SpaIllustration className="w-24 h-24 mx-auto mb-4 animate-float" />
          <h1 className="text-2xl font-bold text-gray-900">Crie sua conta</h1>
          <p className="text-gray-500 text-sm mt-1">Agende seus horários com facilidade</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4" role="alert">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Seu nome"
              className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="(11) 99999-9999"
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
              minLength={6}
              placeholder="Mínimo 6 caracteres"
              className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            aria-label="Criar conta"
            className="w-full gradient-pink text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-pink-200/50"
          >
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-3">
          <p className="text-sm text-gray-500">
            Já tem conta?{' '}
            <Link href="/login" className="text-pink-600 font-medium hover:underline">
              Entrar
            </Link>
          </p>
          <Link href="/" className="text-xs text-gray-400 hover:text-pink-500 block">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  )
}
