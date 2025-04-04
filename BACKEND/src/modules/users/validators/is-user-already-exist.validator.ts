// src/modules/users/validators/is-user-already-exist.validator.ts
import { registerDecorator, ValidationOptions } from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../services/user.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IsUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExistValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}

  async validate(value: string): Promise<boolean> {
    if (!value) return true;

    const userByEmail = await this.userService.findByEmail(value);
    if (userByEmail) return false;

    const userByUsername = await this.userService.findByUsername(value);
    return !userByUsername;
  }

  defaultMessage(): string {
    return 'User with this username or email already exists';
  }
}

// Esta é a função que você usará como decorator
export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUserAlreadyExistValidator,
    });
  };
}
