'use client'

import { useEffect, useState } from 'react'
import { getMyAppointments, cancelAppointment } from '@/lib/client-actions'
import { logout } from '@/lib/auth-actions'

interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  serviceName: string
  servicePrice: string
  professionalName: string
  professionalPhone: string | null
}

export default function MeusAgendamentosPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  useEffect(() => {
    loadAppointments()
  }, [])

  async function loadAppointments() {
    const data = await getMyAppointments()
    setAppointments(data as Appointment[])
    setLoading(false)
  }

  async function handleCancel(id: string) {
    if (!confirm('Deseja realmente cancelar este agendamento?')) return
    const result = await cancelAppointment(id)
    if (result.error) {
      alert(`⚠️ ${result.error}`)
    } else {
      alert('✅ Agendamento cancelado com sucesso.')
      loadAppointments()
    }
  }

  function formatDate(dateStr: string) {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  function getDayName(dateStr: string) {
    const date = new Date(dateStr + 'T12:00:00')
    return date.toLocaleDateString('pt-BR', { weekday: 'short' })
  }

  function canCancel(apt: Appointment) {
    const appointmentDateTime = new Date(`${apt.date}T${apt.startTime}`)
    const now = new Date()
    const diffHours = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffHours >= 24
  }

  function getWhatsappLink(phone: string | null, name: string) {
    if (!phone) return null
    const cleaned = phone.replace(/\D/g, '')
    return `https://wa.me/55${cleaned}?text=${encodeURIComponent(`Olá ${name}, tenho um agendamento no DaniCoiffer!`)}`
  }

  // Filtrar por mês selecionado
  const filtered = appointments.filter((apt) => apt.date.startsWith(selectedMonth))
  const upcoming = filtered.filter((apt) => apt.status === 'agendado').sort((a, b) => a.date.localeCompare(b.date))
  const past = filtered.filter((apt) => apt.status !== 'agendado')

  // Gerar dias do mês com agendamentos
  const daysWithAppointments = new Set(filtered.map((apt) => apt.date))

  // Gerar calendário do mês
  const [year, month] = selectedMonth.split('-').map(Number)
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()

  if (loading) {
    return (
      <main className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        <p className="text-pink-500 animate-pulse">Carregando...</p>
      </main>
    )
  }

  return (
    <main className="flex-1 px-4 py-6 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-pink-500">Meus Horários</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-gray-400 hover:text-pink-500">Sair</button>
        </form>
      </div>

      {/* Seletor de mês */}
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full border border-pink-200 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
      />

      {/* Mini calendário */}
      <div className="border border-pink-100 rounded-xl p-3 mb-6">
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
            <span key={d} className="text-gray-400 font-medium py-1">{d}</span>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <span key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const hasAppointment = daysWithAppointments.has(dateStr)
            const isToday = dateStr === new Date().toISOString().split('T')[0]

            return (
              <span
                key={day}
                className={`py-1.5 rounded-full text-xs font-medium ${
                  hasAppointment
                    ? 'bg-pink-500 text-white'
                    : isToday
                    ? 'bg-pink-100 text-pink-600'
                    : 'text-gray-600'
                }`}
              >
                {day}
              </span>
            )
          })}
        </div>
      </div>

      {/* Próximos agendamentos */}
      {upcoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">📅 Próximos</h2>
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <div key={apt.id} className="border border-pink-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.serviceName}</p>
                    <p className="text-xs text-gray-500">com {apt.professionalName}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    confirmado
                  </span>
                </div>

                <div className="flex gap-4 text-sm text-gray-600 mb-3">
                  <span>📅 {getDayName(apt.date)}, {formatDate(apt.date)}</span>
                  <span>🕐 {apt.startTime.slice(0, 5)}</span>
                </div>

                <div className="flex gap-2">
                  {canCancel(apt) ? (
                    <button
                      onClick={() => handleCancel(apt.id)}
                      className="flex-1 text-sm py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancelar
                    </button>
                  ) : (
                    <span className="flex-1 text-xs text-center py-2 text-orange-500 bg-orange-50 rounded-lg">
                      ⚠️ Cancelamento indisponível (menos de 24h)
                    </span>
                  )}
                  {apt.professionalPhone && (
                    <a
                      href={getWhatsappLink(apt.professionalPhone, apt.professionalName)!}
                      target="_blank"
                      className="flex-1 text-sm py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Histórico */}
      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">📋 Histórico</h2>
          <div className="space-y-2">
            {past.map((apt) => (
              <div key={apt.id} className="border border-gray-100 rounded-lg p-3 opacity-60">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{apt.serviceName}</p>
                    <p className="text-xs text-gray-400">{formatDate(apt.date)} • {apt.startTime.slice(0, 5)}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    apt.status === 'cancelado' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {appointments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-5xl mb-4">📅</p>
          <p className="text-gray-400">Nenhum agendamento ainda</p>
          <a href="/agendar" className="text-pink-500 text-sm hover:underline mt-2 inline-block">
            Agendar agora →
          </a>
        </div>
      )}
    </main>
  )
}
