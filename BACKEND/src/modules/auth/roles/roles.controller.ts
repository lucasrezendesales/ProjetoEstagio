// src/modules/auth/roles/roles.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Permission } from './permission.enum';
import { Role } from './roles.enum';
import { RolePermissionMapping } from './role-permission.mapping';
import { RequirePermissions } from '../decorators/require-permissions.decorator';
import { Roles } from '../decorators/roles.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.FINANCIAL_MANAGER)
  @RequirePermissions(Permission.MANAGE_ROLES)
  async getAllRoles() {
    await Promise.resolve();
    return {
      roles: Object.values(Role),
      permissions: Object.values(Permission),
      mappings: RolePermissionMapping,
    };
  }

  @Post('assign-role/:userId')
  @Roles(Role.SUPER_ADMIN)
  @RequirePermissions(Permission.MANAGE_ROLES)
  async assignRole(@Param('userId') userId: string, @Body('role') role: Role) {
    return this.rolesService.assignRoleToUser(+userId, role);
  }

  @Post('update-permissions/:role')
  @Roles(Role.SUPER_ADMIN)
  @RequirePermissions(Permission.MANAGE_ROLES)
  async updatePermissions(
    @Param('role') role: Role,
    @Body('permissions') permissions: Permission[]
  ) {
    return this.rolesService.updateRolePermissions(role, permissions);
  }
}
