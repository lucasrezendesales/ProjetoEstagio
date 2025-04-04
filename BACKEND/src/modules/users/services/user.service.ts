import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { RecoverPasswordDto } from '../dto/recover-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../dto/user-response.dto';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../../../shared/services/email.service';
import { IUserService } from '../interfaces/user-service.interface';

@Injectable()
export class UserService implements IUserService {
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOCK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.create(createUserDto);
    return new UserResponseDto(user);
  }

  async findAll(options: {
    page: number;
    limit: number;
  }): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll(options);
    return users.map((user) => new UserResponseDto(user));
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserResponseDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.update(id, updateUserDto);
    return new UserResponseDto(user);
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
    await this.userRepository.updatePassword(id, newPassword);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { userId, currentPassword, newPassword } = changePasswordDto;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.userRepository.updatePassword(userId, newPassword);
  }

  async incrementLoginAttempts(id: number): Promise<void> {
    await this.userRepository.incrementLoginAttempts(id);
  }

  async resetLoginAttempts(id: number): Promise<void> {
    await this.userRepository.resetLoginAttempts(id);
  }

  async lockUser(id: number, until: Date): Promise<void> {
    await this.userRepository.lockUser(id, until);
  }

  async unlockUser(id: number): Promise<void> {
    await this.userRepository.unlockUser(id);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userRepository.updateLastLogin(id);
  }

  async setRecoveryToken(
    id: number,
    token: string,
    expiry: Date
  ): Promise<void> {
    await this.userRepository.setRecoveryToken(id, token, expiry);
  }

  async clearRecoveryToken(id: number): Promise<void> {
    await this.userRepository.clearRecoveryToken(id);
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { usernameOrEmail, password } = loginUserDto;

    const user = await this.getUserByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.checkUserLockStatus(user);
    this.checkUserActiveStatus(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await this.handleFailedLoginAttempt(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.handleSuccessfulLogin(user);
    return user;
  }

  async initiatePasswordRecovery(
    recoverPasswordDto: RecoverPasswordDto
  ): Promise<void> {
    const { email } = recoverPasswordDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      //NÃO REVELAR SE O EMAIL EXISTE OU NÃO
      return;
    }

    const token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_RECOVERY_SECRET'),
        expiresIn: '1h',
      }
    );

    const expiryDate = new Date(Date.now() + 3600000); // 1 hour from now
    await this.userRepository.setRecoveryToken(user.id, token, expiryDate);

    await this.sendRecoveryEmail(user.email, token);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;

    let payload;
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_RECOVERY_SECRET'),
      });
    } catch (err) {
      throw new BadRequestException(`Invalid or expired token: ${err}`);
    }

    const user = await this.userRepository.findById(payload.sub);
    if (
      !user ||
      user.recoveryToken !== token ||
      (user.tokenExpiry && new Date() > user.tokenExpiry)
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.userRepository.updatePassword(user.id, newPassword);
    await this.userRepository.clearRecoveryToken(user.id);
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const isValid =
        payload.sub === userId &&
        user.refreshToken === refreshToken &&
        (!user.tokenExpiry || new Date() < user.tokenExpiry);

      return isValid;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  private async getUserByUsernameOrEmail(
    identifier: string
  ): Promise<User | null> {
    if (identifier.includes('@')) {
      return this.userRepository.findByEmail(identifier);
    }
    return this.userRepository.findByUsername(identifier);
  }

  private checkUserLockStatus(user: User): void {
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = Math.ceil(
        (user.lockUntil.getTime() - Date.now()) / 60000
      );
      throw new ForbiddenException(
        `Account is temporarily locked. Try again in ${remainingTime} minutes.`
      );
    }
  }

  private checkUserActiveStatus(user: User): void {
    if (!user.active) {
      throw new ForbiddenException('Account is deactivated');
    }
  }

  private async handleFailedLoginAttempt(user: User): Promise<void> {
    await this.userRepository.incrementLoginAttempts(user.id);

    const updatedUser = await this.userRepository.findById(user.id);
    if (
      updatedUser &&
      updatedUser.loginAttempts &&
      updatedUser.loginAttempts >= this.MAX_LOGIN_ATTEMPTS
    ) {
      const lockUntil = new Date(Date.now() + this.LOCK_TIME);
      await this.userRepository.lockUser(user.id, lockUntil);
    }
  }

  private async handleSuccessfulLogin(user: User): Promise<void> {
    await this.userRepository.resetLoginAttempts(user.id);
    await this.userRepository.updateLastLogin(user.id);
  }

  private async sendRecoveryEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    const subject = 'Password Recovery';
    const text = `To reset your password, click on the following link: ${resetUrl}`;
    const html = `<p>To reset your password, click <a href="${resetUrl}">here</a></p>`;

    await this.emailService.sendEmail(email, subject, text, html);
  }
}
