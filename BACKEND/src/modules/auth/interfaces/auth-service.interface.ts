import { User } from '../../users/entities/user.entity';
import { RecoverPasswordDto } from '../../users/dto/recover-password.dto';
import { ResetPasswordDto } from '../../users/dto/reset-password.dto';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export interface IAuthService {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  getAuthenticatedUser(user: User): Promise<UserResponseDto>;
  logout(userId: number): Promise<void>;
  initiatePasswordRecovery(
    recoverPasswordDto: RecoverPasswordDto
  ): Promise<void>;
  resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
}
