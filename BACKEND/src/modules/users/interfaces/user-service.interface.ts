import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserResponseDto } from '../dto/user-response.dto';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  findAll(options: { page: number; limit: number }): Promise<UserResponseDto[]>;
  findById(id: number): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
  updatePassword(id: number, newPassword: string): Promise<void>;
  changePassword(changePasswordDto: ChangePasswordDto): Promise<void>;
  incrementLoginAttempts(id: number): Promise<void>;
  resetLoginAttempts(id: number): Promise<void>;
  lockUser(id: number, until: Date): Promise<void>;
  unlockUser(id: number): Promise<void>;
  updateLastLogin(id: number): Promise<void>;
  setRecoveryToken(id: number, token: string, expiry: Date): Promise<void>;
  clearRecoveryToken(id: number): Promise<void>;
  validateUser(loginUserDto: {
    usernameOrEmail: string;
    password: string;
  }): Promise<User>;
  initiatePasswordRecovery(recoverPasswordDto: {
    email: string;
  }): Promise<void>;
  validateRefreshToken(userId: number, refreshToken: string): Promise<boolean>;
}
