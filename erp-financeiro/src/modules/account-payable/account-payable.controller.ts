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
import { AccountPayableService } from './account-payable.service';
import { CreateAccountPayableDto } from './dto/create-account-payable.dto';
import { UpdateAccountPayableDto } from './dto/update-account-payable.dto';
import { QueryAccountPayableDto } from './dto/query-account-payable.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Accounts Payable')
@Controller('accountpayable')
export class AccountPayableController {
  constructor(private readonly accountPayableService: AccountPayableService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova conta a pagar' })
  @ApiResponse({
    status: 201,
    description: 'Conta a pagar criada com sucesso.',
  })
  async create(@Body() createDto: CreateAccountPayableDto) {
    return this.accountPayableService.create(createDto);
  }

  // GET com filtros e paginação
  @Get()
  @ApiOperation({ summary: 'Listar contas a pagar com filtros e paginação' })
  @ApiResponse({
    status: 200,
    description: 'Retorna lista filtrada e paginada de contas a pagar.',
  })
  async findAll(@Query() queryDto: QueryAccountPayableDto) {
    return this.accountPayableService.findAllWithFilters(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de uma conta a pagar por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes da conta a pagar.' })
  async findOne(@Param('id') id: string) {
    return this.accountPayableService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma conta a pagar existente' })
  @ApiResponse({
    status: 200,
    description: 'Conta a pagar atualizada com sucesso.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAccountPayableDto
  ) {
    return this.accountPayableService.update(+id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma conta a pagar' })
  @ApiResponse({
    status: 204,
    description: 'Conta a pagar removida com sucesso.',
  })
  async remove(@Param('id') id: string) {
    return this.accountPayableService.remove(+id);
  }

  // Endpoint para relatório consolidado
  @Get('report/consolidated')
  @ApiOperation({ summary: 'Retornar relatório consolidado de contas a pagar' })
  @ApiResponse({
    status: 200,
    description: 'Dados consolidados das contas a pagar.',
  })
  async getConsolidatedReport() {
    return this.accountPayableService.getReport();
  }
}
