import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Usuario } from '@prisma/client';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async create(data: any): Promise<Usuario> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await this.passwordService.hashPassword(data.password);

    return this.prisma.usuario.create({
      data: {
        ...data,
        senha: hashedPassword,
        ativo: true,
        data_criacao: new Date(),
        perfil: data.perfil || 'USER',
      },
    });
  }

  async updatePassword(userId: number, newPassword: string): Promise<Usuario> {
    const hashedPassword = await this.passwordService.hashPassword(newPassword);
    
    return this.prisma.usuario.update({
      where: { id: userId },
      data: { 
        senha: hashedPassword,
        token_recuperacao: null,
        token_validade: null,
      },
    });
  }

  async markTokenAsUsed(token: string): Promise<void> {
    await this.prisma.usuario.updateMany({
      where: { token_recuperacao: token },
      data: { token_recuperacao: null, token_validade: null },
    });
  }
}