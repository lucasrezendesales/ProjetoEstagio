import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

export default async () => {
  // Configurar banco de dados de teste
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}_test`;

  // Executar migrações
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  // Limpar dados de teste
  await prisma.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`;
  await prisma.$executeRaw`CREATE SCHEMA public`;
  await prisma.$disconnect();
};
