'use client'

import { useEffect, useState } from 'react'
import { getDashboardStats } from '@/lib/admin-actions'

interface Stats {
  todayAppointments: number
  monthRevenue: string
  totalClients: number
  popularServices: { name: string; count: number }[]
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])

  if (!stats) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-40 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm space-y-3">
              <div className="h-4 w-32 bg-gray-100 rounded" />
              <div className="h-9 w-24 bg-pink-100 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm space-y-4">
          <div className="h-5 w-56 bg-gray-100 rounded" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-4 bg-pink-100 rounded" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-28 bg-gray-100 rounded" />
                  <div className="h-3 w-20 bg-gray-50 rounded" />
                </div>
                <div className="h-2 bg-pink-50 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-200 rounded-full" style={{ width: `${90 - i * 20}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Agendamentos Hoje</p>
          <p className="text-3xl font-bold text-pink-600 mt-1">{stats.todayAppointments}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Receita do Mês</p>
          <p className="text-3xl font-bold text-green-600 mt-1">R$ {Number(stats.monthRevenue).toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
          <p className="text-sm text-gray-500">Total de Clientes</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">{stats.totalClients}</p>
        </div>
      </div>

      {/* Serviços Populares */}
      <div className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Serviços Mais Populares (Mês)</h2>
        {stats.popularServices.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum agendamento este mês.</p>
        ) : (
          <div className="space-y-3">
            {stats.popularServices.map((s, i) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-pink-600 w-6">{i + 1}.</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{s.name}</span>
                    <span className="text-xs text-gray-400">{s.count} agendamentos</span>
                  </div>
                  <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500 rounded-full"
                      style={{ width: `${(Number(s.count) / Number(stats.popularServices[0].count)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
