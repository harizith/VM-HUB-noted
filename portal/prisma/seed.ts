import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create Demo Student
  const student = await prisma.user.upsert({
    where: { email: 'student@veltech.edu.in' },
    update: {},
    create: {
      email: 'student@veltech.edu.in',
      name: 'Sample Student',
      password: hashedPassword,
      role: Role.STUDENT,
    },
  });

  // 2. Create Demo Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@veltech.edu.in' },
    update: {},
    create: {
      email: 'teacher@veltech.edu.in',
      name: 'Prof. Sample Teacher',
      password: hashedPassword,
      role: Role.TEACHER,
    },
  });

  // 3. Create Demo Admin / Higher Official
  const admin = await prisma.user.upsert({
    where: { email: 'admin@veltech.edu.in' },
    update: {},
    create: {
      email: 'admin@veltech.edu.in',
      name: 'Dr. Official Admin',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('Seed data created successfully:');
  console.log({ student, teacher, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
