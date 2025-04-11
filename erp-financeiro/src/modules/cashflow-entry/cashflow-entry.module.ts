import { Module } from '@nestjs/common';
import { CashFlowEntryService } from './cashflow-entry.service';
import { CashFlowEntryController } from './cashflow-entry.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [PrismaClient],
  controllers: [CashFlowEntryController],
  providers: [CashFlowEntryService],
})
export class CashFlowEntryModule {}
