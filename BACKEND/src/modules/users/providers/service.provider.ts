import { Provider } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../../shared/services/email.service';
import { UserRepository } from '../repositories/user.repository';

export const USER_SERVICE: Provider = {
  provide: 'USER_SERVICE',
  useFactory: (
    userRepository: UserRepository,
    jwtService: JwtService,
    configService: ConfigService,
    emailService: EmailService
  ) => new UserService(userRepository, jwtService, configService, emailService),
  inject: ['USER_REPOSITORY', JwtService, ConfigService, EmailService],
};
