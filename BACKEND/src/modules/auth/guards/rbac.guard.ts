// src/modules/auth/guards/rbac.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from '../roles/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/require-permissions.decorator';

interface IRequestWithUser extends Request {
  user: {
    permissions?: Permission[];
    [key: string]: any;
  };
}

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const userPermissions = request.user?.permissions || [];

    if (!request.user || !userPermissions) {
      throw new ForbiddenException('Acesso negado: permissões não encontradas');
    }

    const hasPermission = requiredPermissions.some((permission) =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `Acesso negado: requer permissão ${requiredPermissions.join(' ou ')}`
      );
    }

    return true;
  }
}
