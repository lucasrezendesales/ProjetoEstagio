// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { PasswordService } from './password.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    await Promise.resolve();
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await this.passwordService.hashPassword(
      registerDto.password
    );

    const user = await this.prisma.usuario.create({
      data: {
        email: registerDto.email,
        senha: hashedPassword,
        nome_completo: registerDto.name,
        perfil: 'USER',
      },
    });

    return this.login(user);
  }

  async refreshToken(user: any) {
    return this.login(user);
  }
}
