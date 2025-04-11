import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCashFlowEntryDto } from './dto/create-cashflow-entry.dto';
import { UpdateCashFlowEntryDto } from './dto/update-cashflow-entry.dto';
import { QueryCashFlowEntryDto } from './dto/query-cashflow-entry.dto';
import { subDays } from 'date-fns';

@Injectable()
export class CashFlowEntryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateCashFlowEntryDto) {
    return this.prisma.cashFlowEntry.create({
      data: {
        type: createDto.type,
        amount: createDto.amount,
        date: createDto.date ? new Date(createDto.date) : undefined,
        description: createDto.description,
        reference_document: createDto.reference_document,
        reconciled: createDto.reconciled,
        fk_user_id: createDto.fk_user_id,
      },
    });
  }

  async findAll(queryDto: QueryCashFlowEntryDto) {
    const { type, startDate, endDate, page = '1', limit = '10' } = queryDto;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    const where: any = {};
    if (type) {
      where.type = type;
    }
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.date = { gte: new Date(startDate) };
    } else if (endDate) {
      where.date = { lte: new Date(endDate) };
    }

    const skip = (pageNumber - 1) * limitNumber;
    const [data, total] = await Promise.all([
      this.prisma.cashFlowEntry.findMany({
        where,
        skip,
        take: limitNumber,
        orderBy: { date: 'desc' },
      }),
      this.prisma.cashFlowEntry.count({ where }),
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
    const entry = await this.prisma.cashFlowEntry.findUnique({ where: { id } });
    if (!entry) {
      throw new NotFoundException(
        `Entrada de fluxo de caixa com ID ${id} não encontrada.`
      );
    }
    return entry;
  }

  async update(id: number, updateDto: UpdateCashFlowEntryDto) {
    await this.findOne(id);
    return this.prisma.cashFlowEntry.update({
      where: { id },
      data: {
        type: updateDto.type,
        amount: updateDto.amount,
        date: updateDto.date ? new Date(updateDto.date) : undefined,
        description: updateDto.description,
        reference_document: updateDto.reference_document,
        reconciled: updateDto.reconciled,
        fk_user_id: updateDto.fk_user_id,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.cashFlowEntry.delete({ where: { id } });
  }

  async getDailyCashFlow(days: string | number = 15) {
    const daysNumber = typeof days === 'string' ? Number(days) : days;
    const end = new Date();
    const start = subDays(end, daysNumber - 1);

    const query = `
        SELECT
          CAST("date" AS date) AS day,
          SUM(CASE WHEN "type" = 'income' THEN "amount" ELSE 0 END) AS total_income,
          SUM(CASE WHEN "type" = 'expense' THEN "amount" ELSE 0 END) AS total_expense
        FROM "CashFlowEntry"
        WHERE "date" BETWEEN $1 AND $2
        GROUP BY 1
        ORDER BY 1
      `;

    const result = await this.prisma.$queryRawUnsafe<
      { day: Date; total_income: number; total_expense: number }[]
    >(query, start, end);

    let sumIncome = 0;
    let sumExpense = 0;
    for (const row of result) {
      sumIncome += row.total_income;
      sumExpense += row.total_expense;
    }

    return {
      data: result.map((row) => ({
        day: row.day,
        totalIncome: Number(row.total_income || 0),
        totalExpense: Number(row.total_expense || 0),
      })),
      totalIncome: sumIncome,
      totalExpense: sumExpense,
      net: sumIncome - sumExpense,
      start,
      end,
    };
  }
}
