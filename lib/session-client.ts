'use server'

import { auth } from '@/lib/auth'

export async function getSession() {
  const session = await auth()
  if (!session?.user) return null
  return {
    user: {
      id: session.user.id,
      name: session.user.name || '',
      role: session.user.role || 'cliente',
    }
  }
}
