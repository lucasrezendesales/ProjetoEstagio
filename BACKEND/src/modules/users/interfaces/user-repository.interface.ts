import { User } from '../entities/user.entity';
import { IUser, IUserSafe } from './user.interface';

export interface IUserRepository {
  create(user: IUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<IUserSafe | null>;
  update(id: number, user: Partial<IUser>): Promise<User>;
  updatePassword(id: number, newPassword: string): Promise<void>;
  incrementLoginAttempts(id: number): Promise<void>;
  resetLoginAttempts(id: number): Promise<void>;
  lockUser(id: number, until: Date): Promise<void>;
  unlockUser(id: number): Promise<void>;
  updateLastLogin(id: number): Promise<void>;
  setRecoveryToken(id: number, token: string, expiry: Date): Promise<void>;
  clearRecoveryToken(id: number): Promise<void>;
  findAll(options: { page: number; limit: number }): Promise<IUserSafe[]>;
}
