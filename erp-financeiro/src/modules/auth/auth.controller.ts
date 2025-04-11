// src/modules/auth/auth.controller.ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string', example: 'johndoe' },
        password: { type: 'string', example: 'senhaSecreta' },
      },
    },
  })
  async login(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.authService.login(req.user);
  }
}
