import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

import { CashFlowEntryModule } from './modules/cashflow-entry/cashflow-entry.module';
import { AccountReceivableModule } from './modules/account-receivable/account-receivable.module';
import { AccountPayableModule } from './modules/account-payable/account-payable.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    AccountReceivableModule,
    AccountPayableModule,
    CashFlowEntryModule,
    PrismaModule,
  ],
})
export class AppModule {}
