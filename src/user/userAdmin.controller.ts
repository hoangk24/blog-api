import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersAdminService } from './userAdmin.service';
import { HasRoles } from '@/decorators/roles.decorators';
import { UserRole } from '@/models/user';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/auth/guard/role.guard';

@ApiTags('admin/users')
@Controller('admin/users')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersAdminService.create(createUserDto);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('deactivate')
  async deactivateUser(userId: number) {
    return this.usersAdminService.deactivateUser(userId);
  }
}
