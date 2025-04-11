import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateAccountReceivableDto {
  @ApiPropertyOptional({
    description: 'Documento da conta a receber',
    example: 'AR-001',
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({
    description: 'Valor da conta a receber',
    example: 300.0,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ description: 'Valor já recebido', example: 150.0 })
  @IsOptional()
  @IsNumber()
  amount_received?: number;

  @ApiPropertyOptional({
    description: 'Data de emissão (YYYY-MM-DD)',
    example: '2025-04-03',
  })
  @IsOptional()
  @IsDateString()
  issue_date?: string;

  @ApiPropertyOptional({
    description: 'Data de vencimento (YYYY-MM-DD)',
    example: '2025-04-25',
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({
    description: 'Data de recebimento (YYYY-MM-DD)',
    example: '2025-04-24',
  })
  @IsOptional()
  @IsDateString()
  receipt_date?: string;

  @ApiPropertyOptional({
    description: 'Status da conta a receber',
    example: 'pending',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'ID do usuário associado', example: 1 })
  @IsOptional()
  @IsNumber()
  fk_user_id?: number;
}
