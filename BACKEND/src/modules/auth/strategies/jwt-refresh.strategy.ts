import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../users/services/user.service';
import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        configService.get<string>('JWT_REFRESH_SECRET') ||
        'fallbackRefreshSecret',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any): Promise<User> {
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Aqui você pode adicionar validação adicional do refresh token
    // Por exemplo, verificar se está na lista de tokens válidos

    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      active: user.active,
    });
  }
}
