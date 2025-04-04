import { Injectable, Inject } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { IUserRepository } from '../interfaces/user-repository.interface';

@ValidatorConstraint({ name: 'IsUserExists', async: true })
@Injectable()
export class IsUserExistsValidator implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository
  ) {}

  async validate(id: number, args: ValidationArguments): Promise<boolean> {
    if (!id) return false;
    const user = await this.userRepository.findById(id);
    return !!user;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'User not found';
  }
}

export function IsUserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistsValidator,
    });
  };
}
