/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuários
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@finance.com',
      password: await bcrypt.hash('admin123', 10),
      full_name: 'Administrador do Sistema',
      active: true,
      role: 'ADMIN',
      creation_date: new Date(),
    },
  });

  const financeUser = await prisma.user.create({
    data: {
      username: 'financeiro',
      email: 'financeiro@finance.com',
      password: await bcrypt.hash('finance123', 10),
      full_name: 'Usuário Financeiro',
      active: true,
      role: 'FINANCE',
      creation_date: new Date(),
    },
  });

  // Criar contas a pagar
  await prisma.accountPayable.createMany({
    data: [
      {
        document: 'INV-001',
        amount: 1500.5,
        issue_date: new Date('2023-01-10'),
        due_date: new Date('2023-02-10'),
        status: 'PENDING',
        fk_user_id: adminUser.id,
      },
      {
        document: 'INV-002',
        amount: 2300.75,
        amount_paid: 2300.75,
        issue_date: new Date('2023-01-15'),
        due_date: new Date('2023-02-15'),
        payment_date: new Date('2023-02-10'),
        status: 'PAID',
        fk_user_id: financeUser.id,
      },
    ],
  });

  // Criar contas a receber
  await prisma.accountReceivable.createMany({
    data: [
      {
        document: 'REC-001',
        amount: 3000.0,
        issue_date: new Date('2023-01-05'),
        due_date: new Date('2023-02-05'),
        status: 'PENDING',
        fk_user_id: adminUser.id,
      },
      {
        document: 'REC-002',
        amount: 4500.25,
        amount_received: 4500.25,
        issue_date: new Date('2023-01-20'),
        due_date: new Date('2023-02-20'),
        receipt_date: new Date('2023-02-18'),
        status: 'RECEIVED',
        fk_user_id: financeUser.id,
      },
    ],
  });

  // Criar lançamentos de fluxo de caixa
  await prisma.cashFlowEntry.createMany({
    data: [
      {
        type: 'INCOME',
        amount: 4500.25,
        date: new Date('2023-02-18'),
        description: 'Recebimento de cliente',
        reference_document: 'REC-002',
        reconciled: true,
        fk_user_id: financeUser.id,
      },
      {
        type: 'EXPENSE',
        amount: 2300.75,
        date: new Date('2023-02-10'),
        description: 'Pagamento de fornecedor',
        reference_document: 'INV-002',
        reconciled: true,
        fk_user_id: financeUser.id,
      },
    ],
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
