import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CashFlowEntryService } from './cashflow-entry.service';
import { CreateCashFlowEntryDto } from './dto/create-cashflow-entry.dto';
import { UpdateCashFlowEntryDto } from './dto/update-cashflow-entry.dto';
import { QueryCashFlowEntryDto } from './dto/query-cashflow-entry.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cash Flow Entries')
@Controller('cashflowentries')
export class CashFlowEntryController {
  constructor(private readonly cashFlowEntryService: CashFlowEntryService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova entrada de fluxo de caixa' })
  @ApiResponse({ status: 201, description: 'Entrada criada com sucesso.' })
  async create(@Body() createDto: CreateCashFlowEntryDto) {
    return this.cashFlowEntryService.create(createDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar entradas de fluxo de caixa com paginação e filtragem',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de entradas.' })
  async findAll(@Query() queryDto: QueryCashFlowEntryDto) {
    return this.cashFlowEntryService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma entrada por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da entrada.' })
  async findOne(@Param('id') id: string) {
    return this.cashFlowEntryService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar entrada de fluxo de caixa' })
  @ApiResponse({ status: 200, description: 'Entrada atualizada com sucesso.' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCashFlowEntryDto
  ) {
    return this.cashFlowEntryService.update(+id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover entrada de fluxo de caixa' })
  @ApiResponse({ status: 204, description: 'Entrada removida com sucesso.' })
  async remove(@Param('id') id: string) {
    return this.cashFlowEntryService.remove(+id);
  }

  @Get('report/daily')
  @ApiOperation({
    summary:
      'Relatório diário de fluxo de caixa (entradas e saídas) num intervalo de dias',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna dados diários de receitas e despesas.',
  })
  async getDailyReport(@Query('days') days: string) {
    const daysNumber = days ? parseInt(days, 10) : 15;
    return this.cashFlowEntryService.getDailyCashFlow(daysNumber);
  }
}
