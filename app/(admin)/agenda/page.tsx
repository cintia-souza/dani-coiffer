'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  getAllAppointments,
  getAllProfessionals,
  updateAppointmentStatus,
  blockSlot,
  getBlockedSlots,
  removeBlock,
  updateProfessionalSchedule,
  createProfessional,
} from '@/lib/admin-actions'

const blockSchema = z.object({
  professionalId: z.string().min(1, 'Selecione um profissional'),
  date: z.string().min(1, 'Data obrigatória'),
  allDay: z.boolean(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  reason: z.string().optional(),
})

const professionalSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  workStart: z.string(),
  workEnd: z.string(),
})

type BlockForm = z.infer<typeof blockSchema>
type ProfessionalForm = z.infer<typeof professionalSchema>

interface Appointment {
  id: string
  date: string
  startTime: string
  endTime: string
  status: string
  clientName: string
  clientPhone: string | null
  professionalName: string
  serviceName: string
  servicePrice: string
}

interface Professional {
  id: string
  name: string
  email: string
  phone: string | null
  workStart: string | null
  workEnd: string | null
}

interface Block {
  id: string
  professionalId: string
  date: string
  startTime: string | null
  endTime: string | null
  allDay: boolean | null
  reason: string | null
}

export default function AgendaAdminPage() {
  const [tab, setTab] = useState<'agenda' | 'bloqueios' | 'profissionais'>('agenda')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [showBlockForm, setShowBlockForm] = useState(false)
  const [showProfForm, setShowProfForm] = useState(false)

  const blockForm = useForm<BlockForm>({ resolver: zodResolver(blockSchema), defaultValues: { allDay: true } })
  const profForm = useForm<ProfessionalForm>({ resolver: zodResolver(professionalSchema), defaultValues: { workStart: '08:00', workEnd: '18:00' } })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [apts, profs, blks] = await Promise.all([
      getAllAppointments(),
      getAllProfessionals(),
      getBlockedSlots(),
    ])
    setAppointments(apts as Appointment[])
    setProfessionals(profs as Professional[])
    setBlocks(blks as Block[])
  }

  async function handleStatusChange(id: string, status: 'agendado' | 'concluido' | 'cancelado') {
    await updateAppointmentStatus(id, status)
    loadData()
  }

  async function onBlockSubmit(data: BlockForm) {
    await blockSlot(data)
    setShowBlockForm(false)
    blockForm.reset()
    loadData()
  }

  async function handleRemoveBlock(id: string) {
    await removeBlock(id)
    loadData()
  }

  async function onProfSubmit(data: ProfessionalForm) {
    const result = await createProfessional(data)
    if (result.error) {
      alert(result.error)
      return
    }
    setShowProfForm(false)
    profForm.reset()
    loadData()
  }

  async function handleScheduleUpdate(id: string, workStart: string, workEnd: string) {
    await updateProfessionalSchedule(id, { workStart, workEnd })
    loadData()
  }

  function formatDate(d: string) {
    const [y, m, day] = d.split('-')
    return `${day}/${m}/${y}`
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestão de Agenda</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit" role="tablist">
        {[
          { key: 'agenda', label: 'Agendamentos' },
          { key: 'bloqueios', label: 'Bloqueios' },
          { key: 'profissionais', label: 'Profissionais' },
        ].map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key as typeof tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              tab === t.key ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Agendamentos */}
      {tab === 'agenda' && (
        <div className="bg-white rounded-xl border border-pink-100 shadow-sm overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead className="bg-pink-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Data</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Horário</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Profissional</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Serviço</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">{formatDate(apt.date)}</td>
                  <td className="px-4 py-3">{apt.startTime?.slice(0, 5)}</td>
                  <td className="px-4 py-3 font-medium">{apt.clientName}</td>
                  <td className="px-4 py-3">{apt.professionalName}</td>
                  <td className="px-4 py-3">{apt.serviceName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.status === 'agendado' ? 'bg-blue-100 text-blue-700' :
                      apt.status === 'concluido' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-600'
                    }`}>{apt.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {apt.status === 'agendado' && (
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => handleStatusChange(apt.id, 'concluido')}
                          aria-label={`Marcar como concluído`}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                          ✓ Concluir
                        </button>
                        <button
                          onClick={() => handleStatusChange(apt.id, 'cancelado')}
                          aria-label={`Cancelar agendamento`}
                          className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          ✕ Cancelar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">Nenhum agendamento.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Bloqueios */}
      {tab === 'bloqueios' && (
        <div>
          <button
            onClick={() => setShowBlockForm(!showBlockForm)}
            aria-label="Bloquear horário de profissional"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            + Bloquear Horário
          </button>

          {showBlockForm && (
            <form onSubmit={blockForm.handleSubmit(onBlockSubmit)} className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="block-prof" className="block text-sm font-medium text-gray-700 mb-1">Profissional *</label>
                <select id="block-prof" {...blockForm.register('professionalId')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  <option value="">Selecione...</option>
                  {professionals.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {blockForm.formState.errors.professionalId && <p className="text-red-500 text-xs mt-1" role="alert">{blockForm.formState.errors.professionalId.message}</p>}
              </div>

              <div>
                <label htmlFor="block-date" className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
                <input id="block-date" type="date" {...blockForm.register('date')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              <div className="flex items-center gap-2">
                <input id="block-allday" type="checkbox" {...blockForm.register('allDay')} className="rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                <label htmlFor="block-allday" className="text-sm text-gray-700">Dia inteiro</label>
              </div>

              <div>
                <label htmlFor="block-reason" className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                <input id="block-reason" {...blockForm.register('reason')} placeholder="Ex: Folga, consulta médica..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>

              {!blockForm.watch('allDay') && (
                <>
                  <div>
                    <label htmlFor="block-start" className="block text-sm font-medium text-gray-700 mb-1">Início</label>
                    <input id="block-start" type="time" {...blockForm.register('startTime')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <div>
                    <label htmlFor="block-end" className="block text-sm font-medium text-gray-700 mb-1">Fim</label>
                    <input id="block-end" type="time" {...blockForm.register('endTime')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <button type="submit" className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500">
                  Bloquear
                </button>
              </div>
            </form>
          )}

          {/* Lista de bloqueios */}
          <div className="bg-white rounded-xl border border-pink-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-pink-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Profissional</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Data</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Período</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Motivo</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((b) => (
                  <tr key={b.id} className="border-t border-gray-50">
                    <td className="px-4 py-3">{professionals.find((p) => p.id === b.professionalId)?.name}</td>
                    <td className="px-4 py-3">{formatDate(b.date)}</td>
                    <td className="px-4 py-3">{b.allDay ? 'Dia inteiro' : `${b.startTime?.slice(0, 5)} - ${b.endTime?.slice(0, 5)}`}</td>
                    <td className="px-4 py-3 text-gray-500">{b.reason || '-'}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleRemoveBlock(b.id)}
                        aria-label="Remover bloqueio"
                        className="text-red-500 hover:text-red-600 font-medium text-xs focus:outline-none focus:underline"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {blocks.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Nenhum bloqueio ativo.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Profissionais */}
      {tab === 'profissionais' && (
        <div>
          <button
            onClick={() => setShowProfForm(!showProfForm)}
            aria-label="Cadastrar novo profissional"
            className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            + Novo Profissional
          </button>

          {showProfForm && (
            <form onSubmit={profForm.handleSubmit(onProfSubmit)} className="bg-white rounded-xl p-5 border border-pink-100 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prof-name" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                <input id="prof-name" {...profForm.register('name')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                {profForm.formState.errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{profForm.formState.errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="prof-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input id="prof-email" type="email" {...profForm.register('email')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                {profForm.formState.errors.email && <p className="text-red-500 text-xs mt-1" role="alert">{profForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="prof-phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input id="prof-phone" {...profForm.register('phone')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label htmlFor="prof-pass" className="block text-sm font-medium text-gray-700 mb-1">Senha *</label>
                <input id="prof-pass" type="password" {...profForm.register('password')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
                {profForm.formState.errors.password && <p className="text-red-500 text-xs mt-1" role="alert">{profForm.formState.errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="prof-start" className="block text-sm font-medium text-gray-700 mb-1">Início do turno</label>
                <input id="prof-start" type="time" {...profForm.register('workStart')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label htmlFor="prof-end" className="block text-sm font-medium text-gray-700 mb-1">Fim do turno</label>
                <input id="prof-end" type="time" {...profForm.register('workEnd')} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-pink-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500">
                  Cadastrar
                </button>
              </div>
            </form>
          )}

          {/* Tabela de profissionais */}
          <div className="bg-white rounded-xl border border-pink-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-pink-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Nome</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">E-mail</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Telefone</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-700">Turno</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {professionals.map((p) => (
                  <ProfessionalRow key={p.id} professional={p} onUpdate={handleScheduleUpdate} />
                ))}
                {professionals.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">Nenhum profissional cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfessionalRow({ professional, onUpdate }: { professional: Professional; onUpdate: (id: string, start: string, end: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [start, setStart] = useState(professional.workStart || '08:00')
  const [end, setEnd] = useState(professional.workEnd || '18:00')

  function save() {
    onUpdate(professional.id, start, end)
    setEditing(false)
  }

  return (
    <tr className="border-t border-gray-50">
      <td className="px-4 py-3 font-medium">{professional.name}</td>
      <td className="px-4 py-3 text-gray-600">{professional.email}</td>
      <td className="px-4 py-3 text-gray-600">{professional.phone || '-'}</td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="flex gap-1 items-center">
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="border rounded px-2 py-1 text-xs w-24" />
            <span className="text-gray-400">-</span>
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="border rounded px-2 py-1 text-xs w-24" />
          </div>
        ) : (
          <span className="text-gray-600">{professional.workStart?.slice(0, 5)} - {professional.workEnd?.slice(0, 5)}</span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        {editing ? (
          <button onClick={save} className="text-green-600 font-medium text-xs focus:outline-none focus:underline" aria-label="Salvar turno">Salvar</button>
        ) : (
          <button onClick={() => setEditing(true)} className="text-pink-600 font-medium text-xs focus:outline-none focus:underline" aria-label={`Editar turno de ${professional.name}`}>Editar Turno</button>
        )}
      </td>
    </tr>
  )
}
