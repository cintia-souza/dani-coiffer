'use server'

import { db } from '@/lib/db'
import { appointments, salonConfig, blockedSlots, users } from '@/lib/db/schema'
import { eq, and, ne } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { uuidSchema, dateSchema, timeSchema } from '@/lib/validation'

export async function getAvailableSlots(professionalId: string, date: string, durationMinutes: number) {
  // Validação de inputs
  if (!uuidSchema.safeParse(professionalId).success) return []
  if (!dateSchema.safeParse(date).success) return []
  if (durationMinutes < 10 || durationMinutes > 480) return []

  // Não permitir datas passadas
  const today = new Date().toISOString().split('T')[0]
  if (date < today) return []

  // Config do salão + turno do profissional em paralelo
  const [configResult, profResult, blocksResult, existingResult] = await Promise.all([
    db.select().from(salonConfig).limit(1),
    db.select({ workStart: users.workStart, workEnd: users.workEnd }).from(users).where(eq(users.id, professionalId)).limit(1),
    db.select().from(blockedSlots).where(and(eq(blockedSlots.professionalId, professionalId), eq(blockedSlots.date, date))),
    db.select({ startTime: appointments.startTime, endTime: appointments.endTime }).from(appointments).where(and(eq(appointments.professionalId, professionalId), eq(appointments.date, date), ne(appointments.status, 'cancelado'))),
  ])

  const config = configResult[0]
  const prof = profResult[0]

  if (!prof) return []

  const openHour = parseInt((prof.workStart || config?.openingHour || '08:00').split(':')[0])
  const closeHour = parseInt((prof.workEnd || config?.closingHour || '18:00').split(':')[0])

  // Dia inteiro bloqueado
  if (blocksResult.some((b) => b.allDay)) return []

  // Gerar slots
  const slots: { time: string; available: boolean }[] = []

  for (let h = openHour; h < closeHour; h++) {
    for (const m of [0, 30]) {
      const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const slotMinutes = h * 60 + m
      const endMinutes = slotMinutes + durationMinutes

      if (endMinutes > closeHour * 60) continue

      const isBlocked = blocksResult.some((b) => {
        if (b.allDay) return true
        if (!b.startTime || !b.endTime) return false
        const bStart = parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1])
        const bEnd = parseInt(b.endTime.split(':')[0]) * 60 + parseInt(b.endTime.split(':')[1])
        return slotMinutes < bEnd && endMinutes > bStart
      })

      const isOccupied = existingResult.some((a) => {
        const aStart = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1])
        const aEnd = parseInt(a.endTime.split(':')[0]) * 60 + parseInt(a.endTime.split(':')[1])
        return slotMinutes < aEnd && endMinutes > aStart
      })

      slots.push({ time, available: !isBlocked && !isOccupied })
    }
  }

  return slots
}

export async function createAppointment(data: {
  professionalId: string
  serviceId: string
  date: string
  startTime: string
  durationMinutes: number
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Não autenticado.' }

  // Validação de inputs
  if (!uuidSchema.safeParse(data.professionalId).success) return { error: 'Profissional inválido.' }
  if (!uuidSchema.safeParse(data.serviceId).success) return { error: 'Serviço inválido.' }
  if (!dateSchema.safeParse(data.date).success) return { error: 'Data inválida.' }
  if (!timeSchema.safeParse(data.startTime).success) return { error: 'Horário inválido.' }

  // Não permitir datas passadas
  const today = new Date().toISOString().split('T')[0]
  if (data.date < today) return { error: 'Não é possível agendar em datas passadas.' }

  const [h, m] = data.startTime.split(':').map(Number)
  const slotMinutes = h * 60 + m
  const endMinutes = slotMinutes + data.durationMinutes
  const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`

  // Verificar disponibilidade novamente (previne race condition / double booking)
  const existing = await db
    .select({ startTime: appointments.startTime, endTime: appointments.endTime })
    .from(appointments)
    .where(and(
      eq(appointments.professionalId, data.professionalId),
      eq(appointments.date, data.date),
      ne(appointments.status, 'cancelado')
    ))

  const hasConflict = existing.some((a) => {
    const aStart = parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1])
    const aEnd = parseInt(a.endTime.split(':')[0]) * 60 + parseInt(a.endTime.split(':')[1])
    return slotMinutes < aEnd && endMinutes > aStart
  })

  if (hasConflict) return { error: 'Este horário acabou de ser reservado. Escolha outro.' }

  // Verificar bloqueio
  const blocks = await db
    .select()
    .from(blockedSlots)
    .where(and(eq(blockedSlots.professionalId, data.professionalId), eq(blockedSlots.date, data.date)))

  if (blocks.some(b => b.allDay)) return { error: 'Profissional indisponível nesta data.' }

  await db.insert(appointments).values({
    clientId: session.user.id,
    professionalId: data.professionalId,
    serviceId: data.serviceId,
    date: data.date,
    startTime: data.startTime,
    endTime,
  })

  return { success: true }
}
