import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, users, services } from '@/lib/db/schema'
import { eq, and, or } from 'drizzle-orm'
import { sendReminder24h, sendReminder2h } from '@/lib/email'
import { sendWhatsAppReminder24h, sendWhatsAppReminder2h } from '@/lib/whatsapp'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const today = now.toISOString().split('T')[0]

  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split('T')[0]

  let sent24h = 0
  let sent2h = 0
  let whatsapp24h = 0
  let whatsapp2h = 0

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
    const [client] = await db.select({ name: users.name, email: users.email, phone: users.phone }).from(users).where(eq(users.id, apt.clientId)).limit(1)
    const [professional] = await db.select({ name: users.name }).from(users).where(eq(users.id, apt.professionalId)).limit(1)
    const [service] = await db.select({ name: services.name }).from(services).where(eq(services.id, apt.serviceId)).limit(1)

    if (!client) continue

    const baseData = {
      clientName: client.name,
      serviceName: service?.name || 'Serviço',
      professionalName: professional?.name || 'Profissional',
      date: apt.date,
      time: apt.startTime.slice(0, 5),
      appointmentId: apt.id,
    }

    // Lembrete 24h
    if (apt.date === tomorrowStr && !apt.reminder24hSent) {
      // WhatsApp (prioridade)
      if (client.phone) {
        try {
          const sent = await sendWhatsAppReminder24h({ ...baseData, clientPhone: client.phone })
          if (sent) whatsapp24h++
        } catch (e) {
          console.error(`Erro WhatsApp 24h para ${client.phone}:`, e)
        }
      }

      // Email (complementar)
      if (client.email) {
        try {
          await sendReminder24h({ ...baseData, clientEmail: client.email })
          sent24h++
        } catch (e) {
          console.error(`Erro email 24h para ${client.email}:`, e)
        }
      }

      await db.update(appointments).set({ reminder24hSent: true }).where(eq(appointments.id, apt.id))
    }

    // Lembrete 2h
    if (apt.date === today && !apt.reminder2hSent) {
      // WhatsApp (prioridade)
      if (client.phone) {
        try {
          const sent = await sendWhatsAppReminder2h({ ...baseData, clientPhone: client.phone })
          if (sent) whatsapp2h++
        } catch (e) {
          console.error(`Erro WhatsApp 2h para ${client.phone}:`, e)
        }
      }

      // Email (complementar)
      if (client.email) {
        try {
          await sendReminder2h({ ...baseData, clientEmail: client.email })
          sent2h++
        } catch (e) {
          console.error(`Erro email 2h para ${client.email}:`, e)
        }
      }

      await db.update(appointments).set({ reminder2hSent: true }).where(eq(appointments.id, apt.id))
    }
  }

  return NextResponse.json({
    success: true,
    sent: { email24h: sent24h, email2h: sent2h, whatsapp24h, whatsapp2h },
    checked: pendingAppointments.length,
    date: today,
  })
}
