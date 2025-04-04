import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { JWT_CONFIG } from '../auth.constants';
import { UserService } from '@modules/users/services/user.service';
import { ResetPasswordDto } from '@modules/users/dto/reset-password.dto';
import { RecoverPasswordDto } from '@modules/users/dto/recover-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: JWT_CONFIG.accessTokenExpiry,
    });
  }

  generateRefreshToken(user: User): string {
    const payload = { sub: user.id };

    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: JWT_CONFIG.refreshTokenExpiry,
    });
  }

  getAuthenticatedUser(user: User): UserResponseDto {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      ...new UserResponseDto(user),
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: number): Promise<void> {
    //TODO: BLACKLIST
    await this.userService.updateLastLogin(userId);
  }

  async initiatePasswordRecovery(
    recoverPasswordDto: RecoverPasswordDto
  ): Promise<void> {
    const user = await this.userService.findByEmail(recoverPasswordDto.email);
    if (!user) return; // Segurança: não revelar se o email existe

    const token = this.jwtService.sign(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_RECOVERY_SECRET'),
        expiresIn: JWT_CONFIG.recoveryTokenExpiry,
      }
    );

    const expiryDate = new Date(Date.now() + 3600000); // 1 hora
    await this.userService.setRecoveryToken(user.id, token, expiryDate);

    // TODO: Enviar email
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    let payload;
    try {
      payload = this.jwtService.verify(resetPasswordDto.token, {
        secret: this.configService.get('JWT_RECOVERY_SECRET'),
      });
    } catch (err) {
      throw new BadRequestException(`Invalid or expired token: ${err}`);
    }

    const user = await this.userService.findById(payload.sub);
    if (
      !user ||
      !user.recoveryToken ||
      user.recoveryToken !== resetPasswordDto.token
    ) {
      throw new BadRequestException('Invalid or expired token');
    }

    await this.userService.updatePassword(
      user.id,
      resetPasswordDto.newPassword
    );
    await this.userService.clearRecoveryToken(user.id);
  }
}
