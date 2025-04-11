import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateAccountPayableDto {
  @ApiPropertyOptional({
    description: 'Documento da conta a pagar',
    example: 'AP-001',
  })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({
    description: 'Valor da conta a pagar',
    example: 200.0,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ description: 'Valor já pago', example: 50.0 })
  @IsOptional()
  @IsNumber()
  amount_paid?: number;

  @ApiPropertyOptional({
    description: 'Data de emissão (YYYY-MM-DD)',
    example: '2025-04-05',
  })
  @IsOptional()
  @IsDateString()
  issue_date?: string;

  @ApiPropertyOptional({
    description: 'Data de vencimento (YYYY-MM-DD)',
    example: '2025-04-20',
  })
  @IsOptional()
  @IsDateString()
  due_date?: string;

  @ApiPropertyOptional({
    description: 'Data de pagamento (YYYY-MM-DD)',
    example: '2025-04-18',
  })
  @IsOptional()
  @IsDateString()
  payment_date?: string;

  @ApiPropertyOptional({
    description: 'Status da conta (ex: pending, paid, overdue)',
    example: 'pending',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário associado (cliente)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  fk_user_id?: number;
}
