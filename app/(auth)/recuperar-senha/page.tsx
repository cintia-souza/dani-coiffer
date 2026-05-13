'use client'

import { useState } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/lib/auth-actions'
import { MirrorIllustration } from '@/components/ui/Illustrations'

export default function RecuperarSenhaPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    setSuccess('')
    const result = await resetPassword(formData)
    if (result?.error) {
      setError(result.error)
    } else if (result?.success) {
      setSuccess(result.success)
    }
    setLoading(false)
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-8 gradient-hero min-h-screen">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <MirrorIllustration className="w-24 h-24 mx-auto mb-4 animate-float" />
          <h1 className="text-2xl font-bold text-gray-900">Recuperar senha</h1>
          <p className="text-gray-500 text-sm mt-1">Enviaremos um link para seu e-mail</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl px-4 py-3 mb-4" role="status">
            {success}
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
          <button
            type="submit"
            disabled={loading}
            aria-label="Enviar link de recuperação"
            className="w-full gradient-pink text-white py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-pink-200/50"
          >
            {loading ? 'Enviando...' : 'Enviar link'}
          </button>
        </form>

        <div className="text-center mt-6 space-y-3">
          <Link href="/login" className="text-sm text-pink-600 font-medium hover:underline block">
            ← Voltar ao login
          </Link>
        </div>
      </div>
    </main>
  )
}
