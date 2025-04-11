import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';
import { UpdateAccountReceivableDto } from './dto/update-account-receivable.dto';
import { QueryAccountReceivableDto } from './dto/query-account-receivable.dto';

@Injectable()
export class AccountReceivableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateAccountReceivableDto) {
    return this.prisma.accountReceivable.create({
      data: {
        document: createDto.document,
        amount: createDto.amount,
        amount_received: createDto.amount_received,
        issue_date: createDto.issue_date
          ? new Date(createDto.issue_date)
          : undefined,
        due_date: createDto.due_date ? new Date(createDto.due_date) : undefined,
        receipt_date: createDto.receipt_date
          ? new Date(createDto.receipt_date)
          : undefined,
        status: createDto.status,
        fk_user_id: createDto.fk_user_id,
      },
    });
  }

  async findAllWithFilters(queryDto: QueryAccountReceivableDto) {
    const {
      status,
      startDate,
      endDate,
      clientId,
      page = '1',
      limit = '10',
    } = queryDto;

    // Converte os parâmetros para número
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const where: any = {};

    if (status) {
      where.status = status;
    }
    if (clientId) {
      // Converte clientId caso ainda seja string
      where.fk_user_id = Number(clientId);
    }
    if (startDate && endDate) {
      where.issue_date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.issue_date = { gte: new Date(startDate) };
    } else if (endDate) {
      where.issue_date = { lte: new Date(endDate) };
    }

    const skip = (pageNumber - 1) * limitNumber;
    const [data, total] = await Promise.all([
      this.prisma.accountReceivable.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { issue_date: 'desc' },
      }),
      this.prisma.accountReceivable.count({ where }),
    ]);

    return {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  }

  async findOne(id: number) {
    if (!id || typeof id !== 'number' || isNaN(id)) {
      throw new BadRequestException('ID inválido para busca de conta a pagar.');
    }

    const account = await this.prisma.accountReceivable.findUnique({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException(
        `Conta a receber com ID ${id} não encontrada.`
      );
    }
    return account;
  }

  async update(id: number, updateDto: UpdateAccountReceivableDto) {
    await this.findOne(id);
    return this.prisma.accountReceivable.update({
      where: { id },
      data: {
        document: updateDto.document,
        amount: updateDto.amount,
        amount_received: updateDto.amount_received,
        issue_date: updateDto.issue_date
          ? new Date(updateDto.issue_date)
          : undefined,
        due_date: updateDto.due_date ? new Date(updateDto.due_date) : undefined,
        receipt_date: updateDto.receipt_date
          ? new Date(updateDto.receipt_date)
          : undefined,
        status: updateDto.status,
        fk_user_id: updateDto.fk_user_id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.accountReceivable.delete({ where: { id } });
  }

  async getReport() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Pendentes
    const pending = await this.prisma.accountReceivable.aggregate({
      where: { status: 'pending' },
      _sum: { amount: true },
      _count: true,
    });
    // Vencidas
    const overdue = await this.prisma.accountReceivable.aggregate({
      where: {
        status: { not: 'paid' },
        due_date: { lt: now },
      },
      _sum: { amount: true },
      _count: true,
    });
    // Recebidas nos últimos 30 dias
    const received30 = await this.prisma.accountReceivable.aggregate({
      where: {
        receipt_date: { gte: thirtyDaysAgo },
      },
      _sum: { amount_received: true },
      _count: true,
    });
    // Agendadas (exemplo: status='scheduled')
    const scheduled = await this.prisma.accountReceivable.aggregate({
      where: { status: 'scheduled' },
      _sum: { amount: true },
      _count: true,
    });

    return {
      pending: {
        totalAmount: pending._sum.amount || 0,
        count: pending._count,
      },
      overdue: {
        totalAmount: overdue._sum.amount || 0,
        count: overdue._count,
      },
      receivedLast30Days: {
        totalAmount: received30._sum.amount_received || 0,
        count: received30._count,
      },
      scheduled: {
        totalAmount: scheduled._sum.amount || 0,
        count: scheduled._count,
      },
    };
  }
}
