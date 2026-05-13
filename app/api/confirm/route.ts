import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { appointments, salonConfig } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { uuidSchema } from '@/lib/validation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const action = searchParams.get('action')

  if (!id || !uuidSchema.safeParse(id).success || !['confirm', 'cancel'].includes(action || '')) {
    return new NextResponse(renderPage('Erro', 'Link inválido.', 'error'), { headers: { 'Content-Type': 'text/html' } })
  }

  const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1)

  if (!appointment) {
    return new NextResponse(renderPage('Erro', 'Agendamento não encontrado.', 'error'), { headers: { 'Content-Type': 'text/html' } })
  }

  if (appointment.status === 'cancelado') {
    return new NextResponse(renderPage('Cancelado', 'Este agendamento já foi cancelado.', 'info'), { headers: { 'Content-Type': 'text/html' } })
  }

  if (action === 'confirm') {
    await db.update(appointments).set({ status: 'confirmado' }).where(eq(appointments.id, id))
    return new NextResponse(
      renderPage('Confirmado! ✓', 'Sua presença foi confirmada. Te esperamos no DaniCoiffer! 💖', 'success'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (action === 'cancel') {
    // Verificar regra de cancelamento
    const [config] = await db.select().from(salonConfig).limit(1)
    const cancellationHours = config?.cancellationHours || 24

    const appointmentDate = new Date(`${appointment.date}T${appointment.startTime}`)
    const hoursUntil = (appointmentDate.getTime() - Date.now()) / (1000 * 60 * 60)

    if (hoursUntil < cancellationHours) {
      return new NextResponse(
        renderPage('Não foi possível cancelar', `Cancelamento permitido apenas com ${cancellationHours}h de antecedência. Entre em contato pelo WhatsApp.`, 'error'),
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    await db.update(appointments).set({ status: 'cancelado' }).where(eq(appointments.id, id))
    return new NextResponse(
      renderPage('Cancelado', 'Seu agendamento foi cancelado com sucesso. Esperamos te ver em breve! 💕', 'info'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  return new NextResponse(renderPage('Erro', 'Ação inválida.', 'error'), { headers: { 'Content-Type': 'text/html' } })
}

function renderPage(title: string, message: string, type: 'success' | 'error' | 'info') {
  const color = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#db2777'
  const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - DaniCoiffer</title>
  <style>
    body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fdf2f8; }
    .card { background: white; border-radius: 20px; padding: 40px; text-align: center; max-width: 400px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .emoji { font-size: 48px; margin-bottom: 16px; }
    h1 { color: ${color}; margin: 0 0 12px; font-size: 24px; }
    p { color: #555; font-size: 15px; line-height: 1.5; }
    .back { display: inline-block; margin-top: 20px; color: #db2777; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <div class="emoji">${emoji}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <a href="/" class="back">← Voltar ao site</a>
  </div>
</body>
</html>`
}
