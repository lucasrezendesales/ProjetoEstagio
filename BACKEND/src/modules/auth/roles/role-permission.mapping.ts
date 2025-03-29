// src/modules/auth/roles/role-permission.mapping.ts
import { Role } from './roles.enum';
import { Permission } from './permission.enum';

export const RolePermissionMapping: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.CREATE_BANK_ACCOUNT,
    Permission.READ_BANK_ACCOUNT,
    Permission.UPDATE_BANK_ACCOUNT,
    Permission.DELETE_BANK_ACCOUNT,
    Permission.CREATE_BILL,
    Permission.READ_BILL,
    Permission.PAY_BILL,
    Permission.DELETE_BILL,
    Permission.READ_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.MANAGE_ROLES,
    Permission.AUDIT_LOGS,
  ],
  [Role.FINANCIAL_MANAGER]: [
    Permission.CREATE_BANK_ACCOUNT,
    Permission.READ_BANK_ACCOUNT,
    Permission.UPDATE_BANK_ACCOUNT,
    Permission.CREATE_BILL,
    Permission.READ_BILL,
    Permission.PAY_BILL,
    Permission.READ_REPORTS,
    Permission.EXPORT_REPORTS,
  ],
  [Role.ACCOUNTANT]: [
    Permission.READ_BANK_ACCOUNT,
    Permission.CREATE_BILL,
    Permission.READ_BILL,
    Permission.PAY_BILL,
    Permission.READ_REPORTS,
  ],
  [Role.ANALYST]: [
    Permission.READ_BANK_ACCOUNT,
    Permission.READ_BILL,
    Permission.READ_REPORTS,
  ],
  [Role.USER]: [Permission.READ_BANK_ACCOUNT, Permission.READ_BILL],
  [Role.GUEST]: [],
};
