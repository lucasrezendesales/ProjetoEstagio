import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IUser, IUserSafe } from '../interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(user: any): User {
    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      fullName: user.full_name,
      active: user.active,
      creationDate: user.creation_date,
      lastLogin: user.last_login,
      role: user.role,
      recoveryToken: user.recovery_token,
      tokenExpiry: user.token_expiry,
      loginAttempts: user.login_attempts,
      lockUntil: user.lock_until,
      refreshToken: user.refresh_token,
    });
  }

  private toSafeUser(user: any): IUserSafe {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      fullName: user.full_name,
      active: user.active,
      creationDate: user.creation_date,
      lastLogin: user.last_login,
      role: user.role,
      refreshToken: user.refresh_token,
    };
  }

  async create(user: IUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        full_name: user.fullName,
        active: user.active ?? true,
        creation_date: user.creationDate ?? new Date(),
        role: user.role ?? 'user',
      },
    });

    return this.toDomain(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    return user ? this.toDomain(user) : null;
  }

  async findById(id: number): Promise<IUserSafe | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user ? this.toSafeUser(user) : null;
  }

  async update(id: number, user: Partial<IUser>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: user.username,
        email: user.email,
        full_name: user.fullName,
        active: user.active,
        role: user.role,
      },
    });

    return this.toDomain(updatedUser);
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async incrementLoginAttempts(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        login_attempts: { increment: 1 },
      },
    });
  }

  async resetLoginAttempts(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        login_attempts: 0,
        lock_until: null,
      },
    });
  }

  async lockUser(id: number, until: Date): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        lock_until: until,
      },
    });
  }

  async unlockUser(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        lock_until: null,
        login_attempts: 0,
      },
    });
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        last_login: new Date(),
      },
    });
  }

  async setRecoveryToken(
    id: number,
    token: string,
    expiry: Date
  ): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        recovery_token: token,
        token_expiry: expiry,
      },
    });
  }

  async clearRecoveryToken(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        recovery_token: null,
        token_expiry: null,
      },
    });
  }

  async findAll(options: {
    page: number;
    limit: number;
  }): Promise<IUserSafe[]> {
    const { page, limit } = options;
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        active: true,
        creation_date: true,
        last_login: true,
        role: true,
      },
      orderBy: {
        creation_date: 'desc',
      },
    });

    return users.map((user) => this.toSafeUser(user));
  }
}
