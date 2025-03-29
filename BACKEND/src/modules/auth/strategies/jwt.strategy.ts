// src/modules/auth/strategies/jwt.strategy.ts (atualizado)
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RolePermissionMapping } from '../roles/role-permission.mapping';
import { Role } from '../roles/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.Authentication || 
                       request?.headers?.authorization?.split(' ')[1];
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const userRole = payload.perfil as Role;
    const permissions = RolePermissionMapping[userRole] || [];
    
    return { 
      userId: payload.sub, 
      email: payload.email,
      role: userRole,
      permissions,
    };
  }
}