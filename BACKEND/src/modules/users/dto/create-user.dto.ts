import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { IsUserAlreadyExist } from '../validators/is-user-already-exist.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsUserAlreadyExist({
    message: 'User with this username or email already exists',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist({
    message: 'User with this username or email already exists',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;
}
