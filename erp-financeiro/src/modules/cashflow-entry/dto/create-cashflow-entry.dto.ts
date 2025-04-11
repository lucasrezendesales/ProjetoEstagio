import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
} from 'class-validator';

export class CreateCashFlowEntryDto {
  @ApiPropertyOptional({
    description: 'Tipo da entrada (ex: expense ou income)',
    example: 'expense',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ description: 'Valor da entrada', example: 150.75 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({
    description: 'Data da entrada (YYYY-MM-DD)',
    example: '2025-04-10',
  })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({
    description: 'Descrição da entrada',
    example: 'Compra de suprimentos',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Documento de referência',
    example: 'DOC001',
  })
  @IsOptional()
  @IsString()
  reference_document?: string;

  @ApiPropertyOptional({
    description: 'Indica se a entrada foi conciliada',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  reconciled?: boolean;

  @ApiPropertyOptional({ description: 'ID do usuário associado', example: 1 })
  @IsOptional()
  @IsNumber()
  fk_user_id?: number;
}
