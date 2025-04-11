import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class QueryCashFlowEntryDto {
  @ApiPropertyOptional({
    description: 'Filtro pelo tipo da entrada (ex: expense, income)',
    example: 'expense',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'Data de início do período (YYYY-MM-DD)',
    example: '2025-04-01',
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Data de fim do período (YYYY-MM-DD)',
    example: '2025-04-30',
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({
    description: 'Número da página para paginação',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional({
    description: 'Número de itens por página',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;
}
