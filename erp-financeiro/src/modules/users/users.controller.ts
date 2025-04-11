import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUserPasswordDto } from './dto/change-user-password.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../auth/guards/owner-or-admin.guard';
import { OwnerOnlyGuard } from '../auth/guards/owner-only.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET ALL - somente admin
  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários (admin)' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.' })
  async findAll() {
    return this.usersService.findAll();
  }

  // GET by ID - somente o próprio usuário ou admin
  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por ID (proprietário ou admin)' })
  @ApiResponse({ status: 200, description: 'Dados do usuário.' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // POST - registro público
  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário (registro público)' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // PUT - somente o proprietário ou admin
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário (proprietário ou admin)' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // DELETE - somente o proprietário ou admin
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover usuário (proprietário ou admin)' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso.' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // CHANGE PASSWORD - somente o próprio usuário
  @Put(':id/change-password')
  @ApiOperation({ summary: 'Alterar a senha (somente proprietário)' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso.' })
  async changePassword(
    @Param('id') id: string,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto
  ) {
    return this.usersService.changePassword(+id, changeUserPasswordDto);
  }
}
