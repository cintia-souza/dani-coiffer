import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { users, services, salonConfig } from '../lib/db/schema'
import bcrypt from 'bcryptjs'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function seed() {
  console.log('🌱 Seeding database...')

  // Inserir config do salão
  await db.insert(salonConfig).values({
    salonName: 'Dany Diniz',
    address: 'R. Fernanda, 19 - Jardim Barueri, Barueri - SP, 06411-350',
    phone: '(11) 97666-6767',
    whatsapp: '11976666767',
    pixKey: 'danydiniz@email.com',
    openingHour: '08:00',
    closingHour: '18:00',
    cancellationHours: 24,
  })

  // Inserir profissional
  const hashedPassword = await bcrypt.hash('123456', 10)
  await db.insert(users).values({
    name: 'Dani',
    email: 'dani@danydiniz.com',
    phone: '11976666767',
    password: hashedPassword,
    role: 'profissional',
  })

  // Inserir admin
  await db.insert(users).values({
    name: 'Admin',
    email: 'admin@danydiniz.com',
    phone: '11976666767',
    password: hashedPassword,
    role: 'admin',
  })

  // Inserir serviços
  await db.insert(services).values([
    { name: 'Corte Feminino', description: 'Corte com lavagem e finalização', price: '80.00', durationMinutes: 60 },
    { name: 'Escova', description: 'Escova modelada', price: '50.00', durationMinutes: 45 },
    { name: 'Manicure', description: 'Unhas das mãos', price: '35.00', durationMinutes: 40 },
    { name: 'Pedicure', description: 'Unhas dos pés', price: '40.00', durationMinutes: 45 },
    { name: 'Coloração', description: 'Tintura completa', price: '150.00', durationMinutes: 120 },
    { name: 'Hidratação', description: 'Tratamento capilar profundo', price: '70.00', durationMinutes: 50 },
  ])

  console.log('✅ Seed concluído!')
}

seed().catch(console.error)
