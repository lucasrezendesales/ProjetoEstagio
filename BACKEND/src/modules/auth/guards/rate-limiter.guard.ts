// src/modules/auth/guards/rate-limiter.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {
  RateLimiterMemory,
  IRateLimiterOptions,
  RateLimiterRes,
} from 'rate-limiter-flexible';

interface CustomRequest extends Request {
  ip?: string;
  headers: {
    'x-forwarded-for'?: string;
    [key: string]: string | string[] | undefined;
  };
  socket?: {
    remoteAddress?: string;
  };
}

@Injectable()
export class RateLimiterGuard implements CanActivate {
  private readonly rateLimiter: RateLimiterMemory;

  constructor(config?: IRateLimiterOptions) {
    const defaultConfig: IRateLimiterOptions = {
      points: 5, // 5 tentativas por padrão
      duration: 60 * 15, // 15 minutos por padrão
    };

    this.rateLimiter = new RateLimiterMemory({
      ...defaultConfig,
      ...config,
    });
  }

  private getClientIP(request: CustomRequest): string | null {
    const xForwardedFor = request.headers['x-forwarded-for'];

    if (typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0].trim();
    }

    if (Array.isArray(xForwardedFor)) {
      return xForwardedFor[0].trim();
    }

    if (request.socket?.remoteAddress) {
      return request.socket.remoteAddress;
    }

    if (request.ip) {
      return request.ip;
    }

    return null;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const clientIp = this.getClientIP(request);

    if (!clientIp) {
      return false;
    }

    try {
      await this.rateLimiter.consume(clientIp);
      return true;
    } catch (error: unknown) {
      if (error instanceof RateLimiterRes) {
        return false;
      }
      throw error;
    }
  }
}
