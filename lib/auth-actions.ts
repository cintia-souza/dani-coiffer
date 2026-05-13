'use server'

import { signIn, signOut } from '@/lib/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { checkRateLimit, sanitize, emailSchema, passwordSchema, nameSchema } from '@/lib/validation'
import { headers } from 'next/headers'

async function getClientIP(): Promise<string> {
  const h = await headers()
  return h.get('x-forwarded-for')?.split(',')[0] || h.get('x-real-ip') || 'unknown'
}

export async function login(formData: FormData) {
  const ip = await getClientIP()

  // Rate limiting: 5 tentativas por 15 min
  if (!checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000)) {
    return { error: 'Muitas tentativas. Aguarde 15 minutos.' }
  }

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validação
  if (!emailSchema.safeParse(email).success || !password) {
    return { error: 'E-mail ou senha inválidos.' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/meus-agendamentos',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'E-mail ou senha inválidos.' }
    }
    throw error
  }
}

export async function signup(formData: FormData) {
  const ip = await getClientIP()

  // Rate limiting: 3 cadastros por hora
  if (!checkRateLimit(`signup:${ip}`, 3, 60 * 60 * 1000)) {
    return { error: 'Muitas tentativas. Aguarde um pouco.' }
  }

  const rawEmail = formData.get('email') as string
  const rawPassword = formData.get('password') as string
  const rawName = formData.get('name') as string
  const rawPhone = formData.get('phone') as string

  // Validação
  const emailResult = emailSchema.safeParse(rawEmail)
  const passwordResult = passwordSchema.safeParse(rawPassword)
  const nameResult = nameSchema.safeParse(rawName)

  if (!emailResult.success) return { error: 'E-mail inválido.' }
  if (!passwordResult.success) return { error: 'Senha deve ter entre 6 e 128 caracteres.' }
  if (!nameResult.success) return { error: 'Nome deve ter entre 2 e 100 caracteres.' }

  const email = emailResult.data
  const password = passwordResult.data
  const name = nameResult.data
  const phone = sanitize(rawPhone || '')

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existing) {
    return { error: 'Este e-mail já está cadastrado.' }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await db.insert(users).values({
    name,
    email,
    phone: phone || null,
    password: hashedPassword,
    role: 'cliente',
  })

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/meus-agendamentos',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Conta criada, mas erro ao logar. Tente fazer login.' }
    }
    throw error
  }
}

export async function resetPassword(formData: FormData) {
  const ip = await getClientIP()

  if (!checkRateLimit(`reset:${ip}`, 3, 15 * 60 * 1000)) {
    return { error: 'Muitas tentativas. Aguarde 15 minutos.' }
  }

  // Sempre retorna a mesma mensagem (previne user enumeration)
  return { success: 'Se este e-mail estiver cadastrado, você receberá um link de recuperação.' }
}

export async function logout() {
  await signOut({ redirectTo: '/login' })
}
