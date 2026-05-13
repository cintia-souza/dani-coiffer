import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, users, services } from '@/lib/db/schema'
import { eq, and, or } from 'drizzle-orm'
import { sendReminder24h, sendReminder2h } from '@/lib/email'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const today = now.toISOString().split('T')[0]

  // Calcular amanhã
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]

  let sent24h = 0
  let sent2h = 0

  // Buscar agendamentos pendentes de lembrete
  const pendingAppointments = await db
    .select({
      id: appointments.id,
      date: appointments.date,
      startTime: appointments.startTime,
      status: appointments.status,
      reminder24hSent: appointments.reminder24hSent,
      reminder2hSent: appointments.reminder2hSent,
      clientId: appointments.clientId,
      professionalId: appointments.professionalId,
      serviceId: appointments.serviceId,
    })
    .from(appointments)
    .where(
      and(
        or(eq(appointments.status, 'agendado'), eq(appointments.status, 'confirmado')),
        or(eq(appointments.date, today), eq(appointments.date, tomorrowStr))
      )
    )

  for (const apt of pendingAppointments) {
    // Buscar dados
    const [client] = await db.select({ name: users.name, email: users.email }).from(users).where(eq(users.id, apt.clientId)).limit(1)
    const [professional] = await db.select({ name: users.name }).from(users).where(eq(users.id, apt.professionalId)).limit(1)
    const [service] = await db.select({ name: services.name }).from(services).where(eq(services.id, apt.serviceId)).limit(1)

    if (!client?.email) continue

    const reminderData = {
      clientName: client.name,
      clientEmail: client.email,
      serviceName: service?.name || 'Serviço',
      professionalName: professional?.name || 'Profissional',
      date: apt.date,
      time: apt.startTime.slice(0, 5),
      appointmentId: apt.id,
    }

    // Lembrete 24h: agendamentos de AMANHÃ que ainda não receberam
    if (apt.date === tomorrowStr && !apt.reminder24hSent) {
      try {
        await sendReminder24h(reminderData)
        await db.update(appointments).set({ reminder24hSent: true }).where(eq(appointments.id, apt.id))
        sent24h++
      } catch (e) {
        console.error(`Erro lembrete 24h para ${client.email}:`, e)
      }
    }

    // Lembrete 2h: agendamentos de HOJE (manhã) que ainda não receberam
    if (apt.date === today && !apt.reminder2hSent) {
      try {
        await sendReminder2h(reminderData)
        await db.update(appointments).set({ reminder2hSent: true }).where(eq(appointments.id, apt.id))
        sent2h++
      } catch (e) {
        console.error(`Erro lembrete 2h para ${client.email}:`, e)
      }
    }
  }

  return NextResponse.json({
    success: true,
    sent: { reminder24h: sent24h, reminder2h: sent2h },
    checked: pendingAppointments.length,
    date: today,
  })
}
