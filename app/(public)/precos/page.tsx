'use client'

import { useEffect, useState } from 'react'
import { getServices, getSalonConfig } from '@/lib/client-actions'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  price: string
  durationMinutes: number
  description: string | null
}

interface Config {
  pixKey: string | null
  whatsapp: string | null
}

export default function PrecosPage() {
  const [services, setServices] = useState<Service[]>([])
  const [config, setConfig] = useState<Config | null>(null)
  const [showPix, setShowPix] = useState(false)

  useEffect(() => {
    getServices().then((s) => setServices(s as Service[]))
    getSalonConfig().then((c) => setConfig(c as Config | null))
  }, [])

  return (
    <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Preços</h1>
        <p className="text-gray-500">Serviços de qualidade com valores justos</p>
      </div>

      {services.length === 0 ? (
        <p className="text-gray-400 text-sm text-center animate-pulse">Carregando serviços...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="card-hover bg-white rounded-2xl p-5 border border-pink-50 shadow-sm flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl gradient-pink flex items-center justify-center shrink-0 shadow-md shadow-pink-200/50">
                <span className="text-white text-lg" aria-hidden="true">✨</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800">{service.name}</h3>
                {service.description && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{service.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">⏱ {service.durationMinutes} min</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-pink-600">R$ {service.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Agendar */}
      <div className="text-center mb-8">
        <Link
          href="/agendar"
          aria-label="Agendar um serviço"
          className="inline-block gradient-pink text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-200"
        >
          Agendar Agora →
        </Link>
      </div>

      {/* Pagamento */}
      <div className="border-t border-pink-50 pt-8">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Formas de Pagamento</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PIX */}
          {config?.pixKey && (
            <div className="bg-white rounded-2xl border border-pink-50 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowPix(!showPix)}
                aria-label="Mostrar QR Code PIX"
                className="w-full p-5 flex items-center gap-4 hover:bg-pink-50/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <span className="text-2xl" aria-hidden="true">💳</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-gray-800">PIX</p>
                  <p className="text-xs text-gray-400">Pagamento instantâneo</p>
                </div>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${showPix ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showPix && (
                <div className="px-5 pb-5 text-center space-y-3 border-t border-pink-50 pt-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(config.pixKey)}&color=db2777`}
                    alt="QR Code PIX para pagamento"
                    className="mx-auto rounded-xl shadow-sm"
                    width={180}
                    height={180}
                    loading="lazy"
                  />
                  <p className="text-xs text-gray-500">Chave PIX:</p>
                  <p className="text-sm font-mono bg-pink-50 px-4 py-2 rounded-lg break-all text-gray-700">{config.pixKey}</p>
                  <button
                    onClick={() => { navigator.clipboard.writeText(config.pixKey!); alert('✅ Chave copiada!') }}
                    aria-label="Copiar chave PIX"
                    className="text-sm text-pink-600 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
                  >
                    📋 Copiar chave
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WhatsApp */}
          {config?.whatsapp && (
            <a
              href={`https://wa.me/55${config.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços do DaniCoiffer')}`}
              target="_blank"
              aria-label="Entrar em contato pelo WhatsApp"
              className="card-hover bg-white rounded-2xl border border-pink-50 shadow-sm p-5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <span className="text-2xl" aria-hidden="true">📱</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-800">WhatsApp</p>
                <p className="text-xs text-gray-400">Tire dúvidas ou agende por mensagem</p>
              </div>
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
