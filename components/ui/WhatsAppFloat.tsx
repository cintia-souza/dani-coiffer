'use client'

import { useEffect, useState } from 'react'
import { getSalonConfig } from '@/lib/client-actions'

export default function WhatsAppFloat() {
  const [whatsapp, setWhatsapp] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getSalonConfig().then((config) => {
      if (config?.whatsapp) setWhatsapp(config.whatsapp)
    })
  }, [])

  if (!whatsapp) return null

  const messages = [
    { label: '💬 Tirar uma dúvida', text: 'Olá! Gostaria de tirar uma dúvida sobre os serviços do DaniCoiffer.' },
    { label: '📅 Ajuda com agendamento', text: 'Olá! Preciso de ajuda para agendar um horário no DaniCoiffer.' },
    { label: '💰 Consultar preços', text: 'Olá! Gostaria de saber os preços dos serviços do DaniCoiffer.' },
    { label: '📍 Localização', text: 'Olá! Gostaria de saber o endereço e como chegar no DaniCoiffer.' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu de opções */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl border border-pink-100 p-4 w-72 z-50 space-y-2">
            <p className="text-sm font-semibold text-gray-800 mb-3">Como podemos ajudar?</p>
            {messages.map((msg) => (
              <a
                key={msg.label}
                href={`https://wa.me/55${whatsapp}?text=${encodeURIComponent(msg.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={msg.label}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 rounded-xl hover:bg-pink-50 transition-colors"
              >
                {msg.label}
              </a>
            ))}
            <div className="border-t border-pink-50 pt-2 mt-2">
              <a
                href={`https://wa.me/55${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center text-sm font-medium text-pink-600 hover:underline py-1"
              >
                Abrir conversa livre →
              </a>
            </div>
          </div>
        </>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Falar conosco pelo WhatsApp"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-200/50 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>
    </div>
  )
}
