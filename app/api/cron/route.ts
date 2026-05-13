import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, users, services } from '@/lib/db/schema'
import { eq, and, or } from 'drizzle-orm'
import { sendReminder24h, sendReminder2h } from '@/lib/email'

// Proteger com secret para que só o cron possa chamar
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  let sent24h = 0
  let sent2h = 0

  // Buscar agendamentos que precisam de lembrete
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
        or(eq(appointments.reminder24hSent, false), eq(appointments.reminder2hSent, false))
      )
    )

  for (const apt of pendingAppointments) {
    const appointmentDate = new Date(`${apt.date}T${apt.startTime}`)
    const hoursUntil = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    // Pular agendamentos passados
    if (hoursUntil < 0) continue

    // Buscar dados do cliente, profissional e serviço
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

    // Lembrete de 24h (enviar entre 24h e 22h antes)
    if (!apt.reminder24hSent && hoursUntil <= 24 && hoursUntil > 22) {
      try {
        await sendReminder24h(reminderData)
        await db.update(appointments).set({ reminder24hSent: true }).where(eq(appointments.id, apt.id))
        sent24h++
      } catch (e) {
        console.error(`Erro ao enviar lembrete 24h para ${client.email}:`, e)
      }
    }

    // Lembrete de 2h (enviar entre 2h e 1.5h antes)
    if (!apt.reminder2hSent && hoursUntil <= 2 && hoursUntil > 1.5) {
      try {
        await sendReminder2h(reminderData)
        await db.update(appointments).set({ reminder2hSent: true }).where(eq(appointments.id, apt.id))
        sent2h++
      } catch (e) {
        console.error(`Erro ao enviar lembrete 2h para ${client.email}:`, e)
      }
    }
  }

  return NextResponse.json({
    success: true,
    sent: { reminder24h: sent24h, reminder2h: sent2h },
    checked: pendingAppointments.length,
  })
}
