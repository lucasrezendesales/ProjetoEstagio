import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';
import { IsUserExists } from '../validators/is-user-exists.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsUserExists()
  id: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  active?: boolean;
}
