// src/modules/auth/owner-only.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnerOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = Number(request.params.id);
    const userId: number = user.id || user.userId;

    if (user && userId === paramId) {
      return true;
    }
    throw new ForbiddenException(
      'Somente o próprio usuário pode realizar esta ação.'
    );
  }
}
