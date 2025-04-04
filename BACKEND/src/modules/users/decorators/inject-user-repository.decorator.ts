import { Inject } from '@nestjs/common';

export const InjectUserRepository = () => Inject('USER_REPOSITORY');
