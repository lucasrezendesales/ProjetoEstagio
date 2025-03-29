// src/modules/auth/roles/permission.enum.ts
export enum Permission {
  // Usuários
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  // Contas Bancárias
  CREATE_BANK_ACCOUNT = 'create_bank_account',
  READ_BANK_ACCOUNT = 'read_bank_account',
  UPDATE_BANK_ACCOUNT = 'update_bank_account',
  DELETE_BANK_ACCOUNT = 'delete_bank_account',

  // Financeiro
  CREATE_BILL = 'create_bill',
  READ_BILL = 'read_bill',
  PAY_BILL = 'pay_bill',
  DELETE_BILL = 'delete_bill',

  // Relatórios
  READ_REPORTS = 'read_reports',
  EXPORT_REPORTS = 'export_reports',

  // Administração
  MANAGE_ROLES = 'manage_roles',
  AUDIT_LOGS = 'audit_logs',
}
