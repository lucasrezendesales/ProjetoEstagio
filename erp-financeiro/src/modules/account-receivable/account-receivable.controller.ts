import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AccountReceivableService } from './account-receivable.service';
import { CreateAccountReceivableDto } from './dto/create-account-receivable.dto';
import { UpdateAccountReceivableDto } from './dto/update-account-receivable.dto';
import { QueryAccountReceivableDto } from './dto/query-account-receivable.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Accounts Receivable')
@Controller('accountreceivable')
export class AccountReceivableController {
  constructor(
    private readonly accountReceivableService: AccountReceivableService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova conta a receber' })
  @ApiResponse({
    status: 201,
    description: 'Conta a receber criada com sucesso.',
  })
  async create(@Body() createDto: CreateAccountReceivableDto) {
    return this.accountReceivableService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar contas a receber com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Retorna lista filtrada e paginada de contas a receber.',
  })
  async findAll(@Query() queryDto: QueryAccountReceivableDto) {
    return this.accountReceivableService.findAllWithFilters(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma conta a receber por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da conta a receber.' })
  async findOne(@Param('id') id: string) {
    return this.accountReceivableService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma conta a receber existente' })
  @ApiResponse({
    status: 200,
    description: 'Conta a receber atualizada com sucesso.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAccountReceivableDto
  ) {
    return this.accountReceivableService.update(+id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma conta a receber' })
  @ApiResponse({
    status: 204,
    description: 'Conta a receber removida com sucesso.',
  })
  async remove(@Param('id') id: string) {
    return this.accountReceivableService.remove(+id);
  }

  @Get('report/consolidated')
  @ApiOperation({
    summary:
      'Retorna relatório consolidado de contas a receber (pendentes, vencidas etc.)',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados consolidados das contas a receber.',
  })
  async getConsolidatedReport() {
    return this.accountReceivableService.getReport();
  }
}
