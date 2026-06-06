import 'dotenv/config'
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { salonConfig } from '../lib/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function updatePhone() {
  await db.update(salonConfig).set({
    whatsapp: '11976666767',
    phone: '(11) 97666-6767',
  })
  console.log('✅ Telefone atualizado no banco!')
}

updatePhone().catch(console.error)
