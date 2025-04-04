import { Provider } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PrismaService } from '../../../../prisma/prisma.service';

export const USER_REPOSITORY: Provider = {
  provide: 'USER_REPOSITORY',
  useFactory: (prisma: PrismaService) => new UserRepository(prisma),
  inject: [PrismaService],
};
