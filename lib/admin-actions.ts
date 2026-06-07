'use server'

import { db } from '@/lib/db'
import { services, users, appointments, blockedSlots, salonConfig } from '@/lib/db/schema'
import { eq, and, desc, sql, gte, lte } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { uuidSchema, sanitize } from '@/lib/validation'

// === SERVIÇOS ===

export async function createService(data: {
  name: string
  description?: string
  price: string
  durationMinutes: number
  photoUrl?: string
}) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  await db.insert(services).values({
    name: data.name,
    description: data.description || null,
    price: data.price,
    durationMinutes: data.durationMinutes,
    photoUrl: data.photoUrl || null,
  })

  revalidatePath('/servicos')
  return { success: true }
}

export async function updateService(id: string, data: {
  name: string
  description?: string
  price: string
  durationMinutes: number
  photoUrl?: string
  active?: boolean
}) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  await db.update(services).set({
    name: data.name,
    description: data.description || null,
    price: data.price,
    durationMinutes: data.durationMinutes,
    photoUrl: data.photoUrl || null,
    active: data.active ?? true,
  }).where(eq(services.id, id))

  revalidatePath('/servicos')
  return { success: true }
}

export async function deleteService(id: string) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }
  if (!uuidSchema.safeParse(id).success) return { error: 'ID inválido.' }

  await db.update(services).set({ active: false }).where(eq(services.id, id))
  revalidatePath('/servicos')
  return { success: true }
}

export async function getAllServices() {
  return db.select().from(services).orderBy(desc(services.createdAt))
}

// === PROFISSIONAIS ===

export async function createProfessional(data: {
  name: string
  email: string
  phone?: string
  password: string
  workStart?: string
  workEnd?: string
}) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, data.email)).limit(1)
  if (existing) return { error: 'E-mail já cadastrado.' }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  await db.insert(users).values({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    password: hashedPassword,
    role: 'profissional',
    workStart: data.workStart || '08:00',
    workEnd: data.workEnd || '18:00',
  })

  revalidatePath('/agenda')
  return { success: true }
}

export async function updateProfessionalSchedule(id: string, data: { workStart: string; workEnd: string }) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  await db.update(users).set({
    workStart: data.workStart,
    workEnd: data.workEnd,
  }).where(eq(users.id, id))

  revalidatePath('/agenda')
  return { success: true }
}

export async function getAllProfessionals() {
  return db
    .select({ id: users.id, name: users.name, email: users.email, phone: users.phone, workStart: users.workStart, workEnd: users.workEnd })
    .from(users)
    .where(eq(users.role, 'profissional'))
}

// === BLOQUEIOS DE AGENDA ===

export async function blockSlot(data: {
  professionalId: string
  date: string
  allDay: boolean
  startTime?: string
  endTime?: string
  reason?: string
}) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  await db.insert(blockedSlots).values({
    professionalId: data.professionalId,
    date: data.date,
    allDay: data.allDay,
    startTime: data.allDay ? null : data.startTime,
    endTime: data.allDay ? null : data.endTime,
    reason: data.reason || null,
  })

  revalidatePath('/agenda')
  return { success: true }
}

export async function removeBlock(id: string) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }
  if (!uuidSchema.safeParse(id).success) return { error: 'ID inválido.' }

  await db.delete(blockedSlots).where(eq(blockedSlots.id, id))
  revalidatePath('/agenda')
  return { success: true }
}

export async function getBlockedSlots(professionalId?: string) {
  if (professionalId) {
    return db.select().from(blockedSlots).where(eq(blockedSlots.professionalId, professionalId)).orderBy(desc(blockedSlots.date))
  }
  return db.select().from(blockedSlots).orderBy(desc(blockedSlots.date))
}

// === AGENDAMENTOS (ADMIN) ===

export async function getAllAppointments(dateFrom?: string, dateTo?: string) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return []

  const result = await db
    .select({
      id: appointments.id,
      date: appointments.date,
      startTime: appointments.startTime,
      endTime: appointments.endTime,
      status: appointments.status,
      serviceId: appointments.serviceId,
      clientId: appointments.clientId,
      professionalId: appointments.professionalId,
    })
    .from(appointments)
    .orderBy(desc(appointments.date))

  // Buscar nomes separadamente para evitar subqueries complexas
  const allUsers = await db.select({ id: users.id, name: users.name, phone: users.phone }).from(users)
  const allServices = await db.select({ id: services.id, name: services.name, price: services.price }).from(services)

  const usersMap = Object.fromEntries(allUsers.map(u => [u.id, u]))
  const servicesMap = Object.fromEntries(allServices.map(s => [s.id, s]))

  return result
    .filter(apt => !dateFrom || !dateTo || (apt.date >= dateFrom && apt.date <= dateTo))
    .map(apt => ({
      id: apt.id,
      date: apt.date,
      startTime: apt.startTime,
      endTime: apt.endTime,
      status: apt.status,
      clientName: usersMap[apt.clientId]?.name || '',
      clientPhone: usersMap[apt.clientId]?.phone || null,
      professionalName: usersMap[apt.professionalId]?.name || '',
      serviceName: servicesMap[apt.serviceId]?.name || '',
      servicePrice: servicesMap[apt.serviceId]?.price || '0',
    }))
}

export async function updateAppointmentStatus(id: string, status: 'agendado' | 'confirmado' | 'concluido' | 'cancelado') {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }
  if (!uuidSchema.safeParse(id).success) return { error: 'ID inválido.' }
  if (!['agendado', 'confirmado', 'concluido', 'cancelado'].includes(status)) return { error: 'Status inválido.' }

  await db.update(appointments).set({ status }).where(eq(appointments.id, id))
  revalidatePath('/agenda')
  return { success: true }
}

// === CONFIGURAÇÕES DO SALÃO ===

export async function updateSalonConfig(data: {
  salonName: string
  address: string
  phone: string
  whatsapp: string
  pixKey: string
  openingHour: string
  closingHour: string
  workDays: string
  cancellationHours: number
  heroImage?: string
  serviceImage1?: string
  serviceImage2?: string
  serviceImage3?: string
}) {
  const session = await auth()
  if (session?.user?.role !== 'admin') return { error: 'Sem permissão.' }

  const [existing] = await db.select({ id: salonConfig.id }).from(salonConfig).limit(1)

  const values = {
    salonName: data.salonName,
    address: data.address,
    phone: data.phone,
    whatsapp: data.whatsapp,
    pixKey: data.pixKey,
    openingHour: data.openingHour,
    closingHour: data.closingHour,
    workDays: data.workDays,
    cancellationHours: data.cancellationHours,
    heroImage: data.heroImage || null,
    serviceImage1: data.serviceImage1 || null,
    serviceImage2: data.serviceImage2 || null,
    serviceImage3: data.serviceImage3 || null,
  }

  if (existing) {
    await db.update(salonConfig).set(values).where(eq(salonConfig.id, existing.id))
  } else {
    await db.insert(salonConfig).values(values)
  }

  revalidatePath('/')
  revalidatePath('/precos')
  revalidatePath('/configuracoes')
  return { success: true }
}

// === DASHBOARD STATS ===

export async function getDashboardStats() {
  const today = new Date().toISOString().split('T')[0]
  const monthStart = today.slice(0, 7) + '-01'

  const [todayCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(appointments)
    .where(and(eq(appointments.date, today), eq(appointments.status, 'agendado')))

  const [monthRevenue] = await db
    .select({ total: sql<string>`COALESCE(SUM(${services.price}::numeric), 0)` })
    .from(appointments)
    .innerJoin(services, eq(appointments.serviceId, services.id))
    .where(and(
      gte(appointments.date, monthStart),
      eq(appointments.status, 'concluido')
    ))

  const [totalClients] = await db
    .select({ count: sql<number>`count(*)` })
    .from(users)
    .where(eq(users.role, 'cliente'))

  const popularServices = await db
    .select({
      name: services.name,
      count: sql<number>`count(*)`,
    })
    .from(appointments)
    .innerJoin(services, eq(appointments.serviceId, services.id))
    .where(gte(appointments.date, monthStart))
    .groupBy(services.name)
    .orderBy(sql`count(*) DESC`)
    .limit(5)

  return {
    todayAppointments: Number(todayCount?.count || 0),
    monthRevenue: monthRevenue?.total || '0',
    totalClients: Number(totalClients?.count || 0),
    popularServices,
  }
}
