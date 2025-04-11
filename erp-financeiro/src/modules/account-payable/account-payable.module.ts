// src/modules/account-payable/account-payable.module.ts
import { Module } from '@nestjs/common';
import { AccountPayableService } from './account-payable.service';
import { AccountPayableController } from './account-payable.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccountPayableController],
  providers: [AccountPayableService],
  exports: [AccountPayableService],
})
export class AccountPayableModule {}
