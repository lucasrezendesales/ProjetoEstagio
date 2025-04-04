import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'usernameOrEmail', // Permite login com email ou username
      passwordField: 'password',
    });
  }

  async validate(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const user = await this.userService.validateUser({
        usernameOrEmail,
        password,
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
