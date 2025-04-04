import { Provider } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../users/services/user.service';

export const AUTH_SERVICE: Provider = {
  provide: 'AUTH_SERVICE',
  useFactory: (
    jwtService: JwtService,
    configService: ConfigService,
    userService: UserService
  ) => new AuthService(jwtService, configService, userService),
  inject: [JwtService, ConfigService, 'USER_SERVICE'],
};
