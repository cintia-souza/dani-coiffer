import { z } from 'zod'

// UUID validation
export const uuidSchema = z.string().uuid()

// Sanitize string input (remove HTML tags)
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim()
}

// Rate limiter (in-memory, per IP)
const attempts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const record = attempts.get(key)

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= maxAttempts) {
    return false
  }

  record.count++
  return true
}

// Validate date format YYYY-MM-DD
export const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)

// Validate time format HH:MM
export const timeSchema = z.string().regex(/^\d{2}:\d{2}$/)

// Email validation
export const emailSchema = z.string().email().max(255)

// Password validation
export const passwordSchema = z.string().min(6).max(128)

// Name validation
export const nameSchema = z.string().min(2).max(100).transform(sanitize)

// Phone validation
export const phoneSchema = z.string().max(20).optional().transform(v => v ? sanitize(v) : undefined)
