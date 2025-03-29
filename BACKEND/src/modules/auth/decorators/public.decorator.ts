// src/modules/auth/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator que marca um endpoint como público (não requer autenticação)
 * @returns Decorator
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
