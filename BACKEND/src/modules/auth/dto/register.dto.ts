// src/modules/auth/dto/register.dto.ts
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string' })
  @MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
  @MaxLength(128, { message: 'Senha deve ter no máximo 128 caracteres' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, {
    message: 'Senha deve conter letras maiúsculas, minúsculas e números',
  })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @IsString({ message: 'Nome completo deve ser uma string' })
  @MinLength(2, { message: 'Nome completo deve ter no mínimo 2 caracteres' })
  @MaxLength(100, {
    message: 'Nome completo deve ter no máximo 100 caracteres',
  })
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  nome_completo: string;
}
