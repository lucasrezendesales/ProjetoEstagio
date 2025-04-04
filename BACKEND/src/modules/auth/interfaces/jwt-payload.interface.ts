export interface JwtPayload {
  /**
   * Subject (user ID)
   */
  sub: number;

  /**
   * Username
   */
  username: string;

  /**
   * Email address
   */
  email: string;

  /**
   * User role/permissions
   */
  role: string;

  /**
   * Issued at (timestamp)
   */
  iat?: number;

  /**
   * Expiration time (timestamp)
   */
  exp?: number;
}

export interface RefreshTokenPayload {
  /**
   * Subject (user ID)
   */
  sub: number;

  /**
   * Issued at (timestamp)
   */
  iat?: number;

  /**
   * Expiration time (timestamp)
   */
  exp?: number;
}

export interface RecoveryTokenPayload {
  /**
   * Subject (user ID)
   */
  sub: number;

  /**
   * Issued at (timestamp)
   */
  iat?: number;

  /**
   * Expiration time (timestamp)
   */
  exp?: number;
}
