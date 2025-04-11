import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';

export class QueryAccountPayableDto {
  @ApiPropertyOptional({ description: 'Filtro pelo status (ex: pending, paid, overdue)', example: 'pending' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Data de início do período (YYYY-MM-DD)', example: '2025-04-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Data de fim do período (YYYY-MM-DD)', example: '2025-04-30' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ description: 'ID do cliente (usuário) associado', example: 1 })
  @IsOptional()
  @IsNumber()
  clientId?: number;

  @ApiPropertyOptional({ description: 'Número da página para paginação', example: 1 })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({ description: 'Quantidade de itens por página', example: 10 })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
