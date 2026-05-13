'use client'

import { useEffect, useState } from 'react'
import { getAllAppointments } from '@/lib/admin-actions'

interface Appointment {
  id: string
  date: string
  status: string
  servicePrice: string
  serviceName: string
  professionalName: string
}

export default function FinanceiroPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [period, setPeriod] = useState<'week' | 'month'>('month')

  useEffect(() => {
    getAllAppointments().then((data) => setAppointments(data as Appointment[]))
  }, [])

  const concluded = appointments.filter((a) => a.status === 'concluido')

  // Agrupar por dia
  const dailyRevenue = concluded.reduce((acc, apt) => {
    acc[apt.date] = (acc[apt.date] || 0) + Number(apt.servicePrice)
    return acc
  }, {} as Record<string, number>)

  // Agrupar por serviço
  const serviceRevenue = concluded.reduce((acc, apt) => {
    acc[apt.serviceName] = (acc[apt.serviceName] || 0) + Number(apt.servicePrice)
    return acc
  }, {} as Record<string, number>)

  // Agrupar por profissional
  const professionalRevenue = concluded.reduce((acc, apt) => {
    const name = apt.professionalName
    if (!acc[name]) acc[name] = { total: 0, count: 0 }
    acc[name].total += Number(apt.servicePrice)
    acc[name].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  const sortedDays = Object.entries(dailyRevenue).sort(([a], [b]) => a.localeCompare(b))
  const sortedServices = Object.entries(serviceRevenue).sort(([, a], [, b]) => b - a)
  const sortedProfessionals = Object.entries(professionalRevenue).sort(([, a], [, b]) => b.total - a.total)

  const totalRevenue = concluded.reduce((sum, a) => sum + Number(a.servicePrice), 0)
  const totalAppointments = concluded.length
  const avgTicket = totalAppointments > 0 ? totalRevenue / totalAppointments : 0

  // Filtrar por período
  const now = new Date()
  const filterDate = period === 'week'
    ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : now.toISOString().slice(0, 7) + '-01'

  const filteredDays = sortedDays.filter(([day]) => day >= filterDate)
  const maxRevenue = Math.max(...filteredDays.map(([, v]) => v), 1)
  const maxProfRevenue = Math.max(...sortedProfessionals.map(([, v]) => v.total), 1)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Financeiro</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Receita Total (concluídos)</p>
          <p className="text-3xl font-bold text-green-600 mt-1">R$ {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Atendimentos Concluídos</p>
          <p className="text-3xl font-bold text-pink-600 mt-1">{totalAppointments}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Ticket Médio</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">R$ {avgTicket.toFixed(2)}</p>
        </div>
      </div>

      {/* Receita por Profissional */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Receita por Profissional</h2>
        {sortedProfessionals.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">Nenhum dado.</p>
        ) : (
          <div className="space-y-4">
            {sortedProfessionals.map(([name, data]) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full gradient-pink flex items-center justify-center shrink-0">
                      <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-pink-600">R$ {data.total.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 ml-2">({data.count} atend.)</span>
                  </div>
                </div>
                <div className="h-2 bg-pink-50 rounded-full overflow-hidden ml-10">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all"
                    style={{ width: `${(data.total / maxProfRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receita por Dia */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Receita por Dia</h2>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setPeriod('week')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${period === 'week' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600'}`}
              aria-label="Ver última semana"
            >
              7 dias
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${period === 'month' ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600'}`}
              aria-label="Ver mês atual"
            >
              Mês
            </button>
          </div>
        </div>

        {filteredDays.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">Nenhum dado para o período.</p>
        ) : (
          <div className="space-y-2">
            {filteredDays.map(([day, value]) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-20">{day.slice(5).replace('-', '/')}</span>
                <div className="flex-1 h-6 bg-pink-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all"
                    style={{ width: `${(value / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 w-20 text-right">R$ {value.toFixed(0)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Receita por Serviço */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Receita por Serviço</h2>
        {sortedServices.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum dado.</p>
        ) : (
          <div className="space-y-3">
            {sortedServices.map(([name, value]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{name}</span>
                <span className="text-sm font-bold text-pink-600">R$ {value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
