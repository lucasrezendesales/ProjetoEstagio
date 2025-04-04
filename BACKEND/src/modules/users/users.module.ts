// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './services/user.service';
import { UserController } from './controllers/users.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';
import { IsUserAlreadyExistValidator } from './validators/is-user-already-exist.validator';
import { IsUserExistsValidator } from './validators/is-user-exists.validator';
import { EmailService } from '../../shared/services/email.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserRepository,
    UserService,
    EmailService,
    IsUserAlreadyExistValidator,
    IsUserExistsValidator,
    {
      provide: 'USER_REPOSITORY',
      useExisting: UserRepository,
    },
  ],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
