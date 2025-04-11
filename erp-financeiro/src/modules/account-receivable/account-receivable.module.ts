import { Module } from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';
import { AccountReceivableController } from './account-receivable.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccountReceivableController],
  providers: [AccountReceivableService],
  exports: [AccountReceivableService],
})
export class AccountReceivableModule {}
