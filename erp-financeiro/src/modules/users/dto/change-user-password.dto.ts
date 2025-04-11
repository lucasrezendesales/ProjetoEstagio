import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangeUserPasswordDto {
  @ApiProperty({ description: 'Senha atual para verificação', example: 'senhaAtual123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'Nova senha desejada', example: 'novaSenhaForte456' })
  @IsString()
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' })
  newPassword: string;
}
