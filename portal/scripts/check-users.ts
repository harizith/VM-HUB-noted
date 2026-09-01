import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users.length);
  for (const u of users) {
    const isMatch = u.password ? await bcrypt.compare('password123', u.password) : false;
    console.log(`- ${u.email} | Role: ${u.role} | Password match for 'password123': ${isMatch}`);
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
