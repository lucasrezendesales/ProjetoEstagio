// src/modules/auth/interfaces/password-reset.interface.ts
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
