// src/modules/auth/password-reset.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PasswordService } from './password.service';
import { v4 as uuidv4 } from 'uuid';
import { addHours } from 'date-fns';

@Injectable()
export class PasswordResetService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async requestPasswordReset(email: string): Promise<string> {
    const user = await this.prisma.usuario.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const token: string = uuidv4();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const expiresAt: Date = addHours(new Date(), 2);

    await this.prisma.usuario.update({
      where: { id: user.id },
      data: {
        token_recuperacao: token,
        token_validade: expiresAt,
      },
    });

    return token;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.prisma.usuario.findFirst({
      where: {
        token_recuperacao: token,
        token_validade: { gte: new Date() },
      },
    });

    if (!user) {
      throw new NotFoundException('Token inválido ou expirado');
    }

    await this.passwordService.updatePassword(user.id, newPassword);
    await this.passwordService.markTokenAsUsed(token);
  }
}
