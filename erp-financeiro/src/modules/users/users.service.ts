import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async findOnePassword(id: number) {
    if (!id) {
      throw new BadRequestException('O id do usuário é obrigatório para a operação.');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: createUserDto.username },
      });
      if (existingUser) {
        throw new ConflictException('Nome de usuário já existe');
      }
    }
    if (createUserDto.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });
      if (existingEmail) {
        throw new ConflictException('Email já existe');
      }
    }

    let hashedPassword: string | null = null;
    if (createUserDto.password) {
      hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    }

    const { ...userData } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        creation_date: new Date(),
        active: true,
        role: 'user',
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    if ('password' in updateUserDto) {
      delete updateUserDto.password;
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async changePassword(
    id: number,
    changeUserPasswordDto: ChangeUserPasswordDto
  ) {
    const user = await this.findOne(id);
    const { currentPassword, newPassword } = changeUserPasswordDto;
    if (!user.password) {
      throw new BadRequestException(
        'Usuário não possui senha definida para alteração'
      );
    }
    const passwordValid = await bcrypt.compare(currentPassword, user.password);
    if (!passwordValid) {
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });
  }

  async updateLoginMetadata(
    id: number,
    recoveryToken: string,
    tokenExpiry: Date
  ) {
    return this.prisma.user.update({
      where: { id },
      data: {
        last_login: new Date(),
        recovery_token: recoveryToken,
        token_expiry: tokenExpiry,
      },
    });
  }
}
