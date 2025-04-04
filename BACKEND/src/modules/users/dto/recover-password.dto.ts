import { IsNotEmpty, IsEmail } from 'class-validator';

export class RecoverPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
