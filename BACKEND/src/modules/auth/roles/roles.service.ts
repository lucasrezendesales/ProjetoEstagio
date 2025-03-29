// src/modules/auth/roles/roles.service.ts
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../prisma/prisma.service';
import { Role } from './roles.enum';
import { Permission } from './permission.enum';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async assignRoleToUser(
    userId: number,
    role: Role
  ): Promise<{ id: number; perfil: string }> {
    // Verifica se a role é válida
    if (!Object.values(Role).includes(role)) {
      throw new ForbiddenException('Role inválida');
    }

    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: { id: true, perfil: true },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const updatedUser = await this.prisma.usuario.update({
      where: { id: userId },
      data: { perfil: role },
      select: { id: true, perfil: true },
    });

    return updatedUser;
  }

  async updateRolePermissions(
    role: Role,
    permissions: Permission[]
  ): Promise<{ role: Role; permissions: Permission[]; message: string }> {
    if (!Object.values(Role).includes(role)) {
      throw new ForbiddenException('Role inválida');
    }

    // Primeiro remove todas as permissões existentes para esta role
    await this.prisma.rolePermission.deleteMany({
      where: { role },
    });

    // Depois adiciona as novas permissões
    const permissionRecords = permissions.map((permission) => ({
      role,
      permission,
    }));

    await this.prisma.rolePermission.createMany({
      data: permissionRecords,
      skipDuplicates: true,
    });

    return {
      role,
      permissions,
      message: 'Permissões atualizadas com sucesso',
    };
  }

  async getUserPermissions(userId: number): Promise<Permission[]> {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      select: { perfil: true },
    });

    if (!user?.perfil) {
      return [];
    }

    const role = user.perfil as Role;
    const permissions = await this.prisma.rolePermission.findMany({
      where: { role },
      select: { permission: true },
    });

    return permissions.map((p) => p.permission as Permission);
  }

  async getAllRolesWithPermissions(): Promise<Record<Role, Permission[]>> {
    const allPermissions = await this.prisma.rolePermission.findMany();

    return allPermissions.reduce(
      (acc, { role, permission }) => {
        if (!acc[role as Role]) {
          acc[role as Role] = [];
        }
        acc[role as Role].push(permission as Permission);
        return acc;
      },
      {} as Record<Role, Permission[]>
    );
  }
}
