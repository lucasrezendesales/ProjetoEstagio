import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiPropertyOptional({ description: 'Nome de usuário', example: 'johndoe' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'johndoe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário',
    example: 'senhaSuperSecreta',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  full_name?: string;
}
