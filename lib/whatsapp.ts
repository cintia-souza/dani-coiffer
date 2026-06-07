const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY
const WHATSAPP_INSTANCE = process.env.WHATSAPP_INSTANCE

interface WhatsAppReminderData {
  clientName: string
  clientPhone: string
  serviceName: string
  professionalName: string
  date: string
  time: string
  appointmentId: string
}

async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  if (!WHATSAPP_API_URL || !WHATSAPP_API_KEY) {
    console.warn('WhatsApp API não configurada. Pule a variável WHATSAPP_API_URL e WHATSAPP_API_KEY.')
    return false
  }

  // Formatar número: remover tudo que não é dígito e garantir código do país
  const cleanPhone = phone.replace(/\D/g, '')
  const fullPhone = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`

  try {
    const response = await fetch(`${WHATSAPP_API_URL}/message/sendText/${WHATSAPP_INSTANCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: WHATSAPP_API_KEY,
      },
      body: JSON.stringify({
        number: fullPhone,
        text: message,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error(`Erro WhatsApp para ${fullPhone}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Erro ao enviar WhatsApp para ${fullPhone}:`, error)
    return false
  }
}

export async function sendWhatsAppReminder24h(data: WhatsAppReminderData): Promise<boolean> {
  const formattedDate = data.date.split('-').reverse().join('/')
  const confirmUrl = `${process.env.AUTH_URL || 'https://danydiniz.com.br'}/api/confirm?id=${data.appointmentId}&action=confirm`

  const message = `✨ *Dany Diniz - Lembrete*\n\nOlá ${data.clientName}! 👋\n\nPassando para lembrar do seu horário *amanhã*:\n\n📅 *Data:* ${formattedDate}\n🕐 *Horário:* ${data.time}\n💇 *Serviço:* ${data.serviceName}\n👩 *Profissional:* ${data.professionalName}\n\n📍 R. Fernanda, 19 - Jardim Barueri, SP\n\n✅ Para confirmar sua presença, acesse:\n${confirmUrl}\n\nCaso precise cancelar ou remarcar, responda esta mensagem.\n\nTe esperamos! 💖`

  return sendWhatsApp(data.clientPhone, message)
}

export async function sendWhatsAppReminder2h(data: WhatsAppReminderData): Promise<boolean> {
  const message = `⏰ *Dany Diniz - Seu horário é daqui a pouco!*\n\nOlá ${data.clientName}!\n\n🕐 *Horário:* ${data.time}\n💇 *Serviço:* ${data.serviceName}\n👩 *Profissional:* ${data.professionalName}\n\n📍 Estamos te esperando na R. Fernanda, 19 - Jardim Barueri!\n\nAté já! 💖`

  return sendWhatsApp(data.clientPhone, message)
}
