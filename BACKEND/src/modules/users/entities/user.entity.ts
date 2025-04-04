export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  active: boolean;
  creationDate: Date;
  lastLogin: Date | null;
  role: string;
  recoveryToken: string | null;
  tokenExpiry: Date | null;
  loginAttempts: number;
  lockUntil: Date | null;
  refreshToken: string | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
