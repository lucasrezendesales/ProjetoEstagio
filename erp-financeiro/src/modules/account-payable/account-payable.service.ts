import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';
import { UpdateAccountPayableDto } from './dto/update-account-payable.dto';
import { QueryAccountPayableDto } from './dto/query-account-payable.dto';

@Injectable()
export class AccountPayableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateAccountPayableDto) {
    return this.prisma.accountPayable.create({
      data: {
        document: createDto.document,
        amount: createDto.amount,
        amount_paid: createDto.amount_paid,
        issue_date: createDto.issue_date
          ? new Date(createDto.issue_date)
          : undefined,
        due_date: createDto.due_date ? new Date(createDto.due_date) : undefined,
        payment_date: createDto.payment_date
          ? new Date(createDto.payment_date)
          : undefined,
        status: createDto.status,
        fk_user_id: createDto.fk_user_id,
      },
    });
  }

  async findAllWithFilters(queryDto: QueryAccountPayableDto) {
    const {
      status,
      startDate,
      endDate,
      clientId,
      page = '1',
      limit = '10',
    } = queryDto;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (clientId) {
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
      this.prisma.accountPayable.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { issue_date: 'desc' },
      }),
      this.prisma.accountPayable.count({ where }),
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
    const account = await this.prisma.accountPayable.findUnique({
      where: { id },
    });
    if (!account) {
      throw new NotFoundException(`Conta a pagar com ID ${id} não encontrada.`);
    }
    return account;
  }

  async update(id: number, updateDto: UpdateAccountPayableDto) {
    await this.findOne(id);
    return this.prisma.accountPayable.update({
      where: { id },
      data: {
        document: updateDto.document,
        amount: updateDto.amount,
        amount_paid: updateDto.amount_paid,
        issue_date: updateDto.issue_date
          ? new Date(updateDto.issue_date)
          : undefined,
        due_date: updateDto.due_date ? new Date(updateDto.due_date) : undefined,
        payment_date: updateDto.payment_date
          ? new Date(updateDto.payment_date)
          : undefined,
        status: updateDto.status,
        fk_user_id: updateDto.fk_user_id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.accountPayable.delete({ where: { id } });
  }

  /**
   * Gera um relatório consolidado para AccountPayable.
   * Exemplo:
   * - Total de contas pendentes: status 'pending'
   * - Total de contas vencidas: due_date < hoje e status != 'paid'
   * - Total de contas pagas: status 'paid'
   * - Total agendado: status 'scheduled'
   * Ajuste as condições conforme sua regra de negócio.
   */
  async getReport() {
    const now = new Date();
    const pending = await this.prisma.accountPayable.aggregate({
      where: { status: 'pending' },
      _sum: { amount: true },
      _count: true,
    });
    const overdue = await this.prisma.accountPayable.aggregate({
      where: {
        status: { not: 'paid' },
        due_date: { lt: now },
      },
      _sum: { amount: true },
      _count: true,
    });
    const paid = await this.prisma.accountPayable.aggregate({
      where: { status: 'paid' },
      _sum: { amount_paid: true },
      _count: true,
    });
    const scheduled = await this.prisma.accountPayable.aggregate({
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
      paid: {
        totalAmount: paid._sum.amount_paid || 0,
        count: paid._count,
      },
      scheduled: {
        totalAmount: scheduled._sum.amount || 0,
        count: scheduled._count,
      },
    };
  }
}
