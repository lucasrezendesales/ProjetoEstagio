/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto'; // Ou outra estratégia para gerar tokens

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    const isMatch =
      user.password && (await bcrypt.compare(password, user.password));
    return isMatch ? user : null;
  }

  async login(user: any) {
    const newRecoveryToken = randomUUID();
    const expiration = new Date(Date.now() + 60 * 60 * 1000);
    await this.usersService.updateLoginMetadata(
      user.id,
      newRecoveryToken,
      expiration
    );

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
