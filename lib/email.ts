import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'DaniCoiffer <noreply@danicoiffer.com.br>'

interface ReminderData {
  clientName: string
  clientEmail: string
  serviceName: string
  professionalName: string
  date: string
  time: string
  appointmentId: string
}

export async function sendReminder24h(data: ReminderData) {
  const confirmUrl = `${process.env.AUTH_URL}/api/confirm?id=${data.appointmentId}&action=confirm`
  const cancelUrl = `${process.env.AUTH_URL}/api/confirm?id=${data.appointmentId}&action=cancel`

  const formattedDate = data.date.split('-').reverse().join('/')

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.clientEmail,
    subject: `💇 Lembrete: Seu horário amanhã no DaniCoiffer`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #db2777; margin-bottom: 5px;">DaniCoiffer</h2>
        <p style="color: #666; font-size: 14px;">Lembrete de agendamento</p>
        <hr style="border: none; border-top: 1px solid #fce7f3; margin: 20px 0;" />

        <p>Olá <strong>${data.clientName}</strong>! 👋</p>
        <p>Passando para lembrar do seu horário <strong>amanhã</strong>:</p>

        <div style="background: #fdf2f8; border-radius: 12px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>📅 Data:</strong> ${formattedDate}</p>
          <p style="margin: 4px 0;"><strong>🕐 Horário:</strong> ${data.time}</p>
          <p style="margin: 4px 0;"><strong>💇 Serviço:</strong> ${data.serviceName}</p>
          <p style="margin: 4px 0;"><strong>👩 Profissional:</strong> ${data.professionalName}</p>
        </div>

        <p style="font-size: 14px; color: #555;">Confirme sua presença:</p>

        <div style="text-align: center; margin: 24px 0;">
          <a href="${confirmUrl}" style="display: inline-block; background: #db2777; color: white; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; margin-right: 8px;">
            ✓ Vou comparecer
          </a>
          <a href="${cancelUrl}" style="display: inline-block; background: #fff; color: #db2777; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; border: 2px solid #db2777;">
            ✕ Preciso cancelar
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #fce7f3; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          DaniCoiffer — Rua Fernanda, 40 — Jardim Barueri, SP
        </p>
      </div>
    `,
  })
}

export async function sendReminder2h(data: ReminderData) {
  const formattedDate = data.date.split('-').reverse().join('/')

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.clientEmail,
    subject: `⏰ Faltam 2h para seu horário no DaniCoiffer!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #db2777; margin-bottom: 5px;">DaniCoiffer</h2>
        <p style="color: #666; font-size: 14px;">Seu horário está chegando!</p>
        <hr style="border: none; border-top: 1px solid #fce7f3; margin: 20px 0;" />

        <p>Olá <strong>${data.clientName}</strong>! ⏰</p>
        <p>Seu atendimento é <strong>daqui a 2 horas</strong>:</p>

        <div style="background: #fdf2f8; border-radius: 12px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>🕐 Horário:</strong> ${data.time}</p>
          <p style="margin: 4px 0;"><strong>💇 Serviço:</strong> ${data.serviceName}</p>
          <p style="margin: 4px 0;"><strong>👩 Profissional:</strong> ${data.professionalName}</p>
        </div>

        <p style="font-size: 14px; color: #555;">📍 Estamos te esperando na <strong>Rua Fernanda, 40 — Jardim Barueri</strong></p>

        <p style="font-size: 13px; color: #888; margin-top: 20px;">Até já! 💖</p>

        <hr style="border: none; border-top: 1px solid #fce7f3; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">
          DaniCoiffer — Salão de Beleza em Barueri
        </p>
      </div>
    `,
  })
}
