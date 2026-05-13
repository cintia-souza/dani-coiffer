'use server'

import { db } from '@/lib/db'
import { appointments, services, users, salonConfig } from '@/lib/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { unstable_cache } from 'next/cache'
import { uuidSchema } from '@/lib/validation'

export async function getMyAppointments() {
  const session = await auth()
  if (!session?.user?.id) return []

  return db
    .select({
      id: appointments.id,
      date: appointments.date,
      startTime: appointments.startTime,
      endTime: appointments.endTime,
      status: appointments.status,
      serviceName: services.name,
      servicePrice: services.price,
      professionalName: users.name,
      professionalPhone: users.phone,
    })
    .from(appointments)
    .innerJoin(services, eq(appointments.serviceId, services.id))
    .innerJoin(users, eq(appointments.professionalId, users.id))
    .where(eq(appointments.clientId, session.user.id))
    .orderBy(desc(appointments.date))
}

export async function cancelAppointment(appointmentId: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Não autenticado.' }

  // Validar UUID
  if (!uuidSchema.safeParse(appointmentId).success) {
    return { error: 'Agendamento inválido.' }
  }

  const [config] = await db.select().from(salonConfig).limit(1)
  const cancellationHours = config?.cancellationHours || 24

  // Buscar agendamento (garantir que pertence ao usuário)
  const [appointment] = await db
    .select()
    .from(appointments)
    .where(and(eq(appointments.id, appointmentId), eq(appointments.clientId, session.user.id)))
    .limit(1)

  if (!appointment) return { error: 'Agendamento não encontrado.' }
  if (appointment.status !== 'agendado') return { error: 'Este agendamento não pode ser cancelado.' }

  const appointmentDateTime = new Date(`${appointment.date}T${appointment.startTime}`)
  const now = new Date()
  const diffHours = (appointmentDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (diffHours < cancellationHours) {
    return { error: `Cancelamento permitido apenas com ${cancellationHours}h de antecedência.` }
  }

  await db
    .update(appointments)
    .set({ status: 'cancelado' })
    .where(eq(appointments.id, appointmentId))

  revalidatePath('/meus-agendamentos')
  return { success: true }
}

// Cached: serviços ativos (revalida a cada 60s)
export const getServices = unstable_cache(
  async () => {
    return db.select().from(services).where(eq(services.active, true))
  },
  ['active-services'],
  { revalidate: 60 }
)

// Cached: profissionais (revalida a cada 60s)
export const getProfessionals = unstable_cache(
  async () => {
    return db
      .select({ id: users.id, name: users.name, phone: users.phone })
      .from(users)
      .where(eq(users.role, 'profissional'))
  },
  ['professionals'],
  { revalidate: 60 }
)

// Cached: config do salão (revalida a cada 5min)
export const getSalonConfig = unstable_cache(
  async () => {
    const [config] = await db.select().from(salonConfig).limit(1)
    return config
  },
  ['salon-config'],
  { revalidate: 300 }
)
