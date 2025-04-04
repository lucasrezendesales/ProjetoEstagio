import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  active: boolean;

  @Expose()
  creationDate: Date;

  @Expose()
  lastLogin: Date | null;

  @Expose()
  role: string;

  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string | null;

  @Expose()
  recoveryToken: string | null;

  @Expose()
  tokenExpiry: Date | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
