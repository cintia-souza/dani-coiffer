'use server'

import { db } from '@/lib/db'
import { galleryPhotos, users } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { uuidSchema, sanitize } from '@/lib/validation'

export async function addGalleryPhoto(data: {
  imageUrl: string
  caption?: string
  category?: string
}) {
  const session = await auth()
  if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'profissional')) {
    return { error: 'Sem permissão.' }
  }

  await db.insert(galleryPhotos).values({
    professionalId: session.user.id,
    imageUrl: data.imageUrl,
    caption: data.caption ? sanitize(data.caption) : null,
    category: (data.category as 'cabelo' | 'unhas' | 'maquiagem' | 'estetica' | 'outro') || 'outro',
  })

  revalidatePath('/galeria')
  return { success: true }
}

export async function deleteGalleryPhoto(id: string) {
  const session = await auth()
  if (!session?.user) return { error: 'Sem permissão.' }
  if (!uuidSchema.safeParse(id).success) return { error: 'ID inválido.' }

  // Admin pode deletar qualquer foto, profissional só as próprias
  if (session.user.role === 'profissional') {
    const [photo] = await db.select().from(galleryPhotos).where(eq(galleryPhotos.id, id)).limit(1)
    if (!photo || photo.professionalId !== session.user.id) {
      return { error: 'Sem permissão.' }
    }
  }

  await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id))
  revalidatePath('/galeria')
  return { success: true }
}

export async function getGalleryPhotos() {
  return db
    .select({
      id: galleryPhotos.id,
      imageUrl: galleryPhotos.imageUrl,
      caption: galleryPhotos.caption,
      category: galleryPhotos.category,
      professionalName: users.name,
      createdAt: galleryPhotos.createdAt,
    })
    .from(galleryPhotos)
    .innerJoin(users, eq(galleryPhotos.professionalId, users.id))
    .where(eq(galleryPhotos.active, true))
    .orderBy(desc(galleryPhotos.createdAt))
}

export async function getGalleryPhotosAdmin() {
  const session = await auth()
  if (!session?.user) return []

  const baseQuery = db
    .select({
      id: galleryPhotos.id,
      imageUrl: galleryPhotos.imageUrl,
      caption: galleryPhotos.caption,
      category: galleryPhotos.category,
      professionalId: galleryPhotos.professionalId,
      professionalName: users.name,
      active: galleryPhotos.active,
      createdAt: galleryPhotos.createdAt,
    })
    .from(galleryPhotos)
    .innerJoin(users, eq(galleryPhotos.professionalId, users.id))
    .orderBy(desc(galleryPhotos.createdAt))

  // Profissional vê só as próprias
  if (session.user.role === 'profissional') {
    return baseQuery.where(eq(galleryPhotos.professionalId, session.user.id))
  }

  return baseQuery
}
