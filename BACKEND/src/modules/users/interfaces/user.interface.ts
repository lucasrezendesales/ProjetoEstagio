export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  active?: boolean;
  creationDate?: Date;
  lastLogin?: Date | null;
  role?: string;
  recoveryToken?: string | null;
  tokenExpiry?: Date | null;
  loginAttempts?: number;
  lockUntil?: Date | null;
  refreshToken?: string | null;
}

export interface IUserSafe {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  active: boolean;
  creationDate: Date;
  lastLogin: Date | null;
  role: string;
  recoveryToken?: string | null;
  tokenExpiry?: Date | null;
  loginAttempts?: number;
  refreshToken?: string | null;
}
