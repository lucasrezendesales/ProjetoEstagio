// src/modules/auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../roles/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

interface IRequestWithUser extends Request {
  user: {
    role: Role;
    [key: string]: any;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<IRequestWithUser>();

    if (!request.user?.role) {
      throw new ForbiddenException(
        'Acesso negado: função de usuário não especificada'
      );
    }

    const hasRole = requiredRoles.some((role) => request.user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acesso negado: requer função ${requiredRoles.join(' ou ')}`
      );
    }

    return true;
  }
}
