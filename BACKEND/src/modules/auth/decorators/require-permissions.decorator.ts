// src/modules/auth/decorators/require-permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Permission } from '../roles/permission.enum';

export const PERMISSIONS_KEY = 'permissions';
export const RequirePermissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
