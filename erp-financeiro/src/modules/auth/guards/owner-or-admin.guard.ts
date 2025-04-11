/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paramId = Number(request.params.id);

    if (user && (user.role === 'admin' || user.id === paramId)) {
      return true;
    }
    throw new ForbiddenException(
      'Você não possui permissão para acessar este recurso.'
    );
  }
}
