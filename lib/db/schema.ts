import { pgTable, uuid, text, timestamp, decimal, integer, boolean, date, time } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  password: text('password').notNull(),
  role: text('role', { enum: ['cliente', 'admin', 'profissional'] }).notNull().default('cliente'),
  avatarUrl: text('avatar_url'),
  workStart: time('work_start').default('08:00'),
  workEnd: time('work_end').default('18:00'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer('duration_minutes').notNull().default(60),
  photoUrl: text('photo_url'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => users.id),
  professionalId: uuid('professional_id').notNull().references(() => users.id),
  serviceId: uuid('service_id').notNull().references(() => services.id),
  date: date('date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  status: text('status', { enum: ['agendado', 'confirmado', 'concluido', 'cancelado'] }).notNull().default('agendado'),
  reminder24hSent: boolean('reminder_24h_sent').default(false),
  reminder2hSent: boolean('reminder_2h_sent').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})

// Bloqueios de horário (profissional indisponível)
export const blockedSlots = pgTable('blocked_slots', {
  id: uuid('id').primaryKey().defaultRandom(),
  professionalId: uuid('professional_id').notNull().references(() => users.id),
  date: date('date').notNull(),
  startTime: time('start_time'),
  endTime: time('end_time'),
  allDay: boolean('all_day').default(false),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow(),
})

export const salonConfig = pgTable('salon_config', {
  id: uuid('id').primaryKey().defaultRandom(),
  salonName: text('salon_name').notNull().default('DaniCoiffer'),
  address: text('address'),
  phone: text('phone'),
  whatsapp: text('whatsapp'),
  pixKey: text('pix_key'),
  openingHour: time('opening_hour').default('08:00'),
  closingHour: time('closing_hour').default('18:00'),
  cancellationHours: integer('cancellation_hours').default(24),
})

// Galeria de fotos dos profissionais
export const galleryPhotos = pgTable('gallery_photos', {
  id: uuid('id').primaryKey().defaultRandom(),
  professionalId: uuid('professional_id').notNull().references(() => users.id),
  imageUrl: text('image_url').notNull(),
  caption: text('caption'),
  category: text('category', { enum: ['cabelo', 'unhas', 'maquiagem', 'estetica', 'outro'] }).default('outro'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})
