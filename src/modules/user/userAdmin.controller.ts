import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersAdminService } from './userAdmin.service';
import { AdminGuard } from '@/decorators/roles.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('admin/users')
@Controller('admin/users')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  @AdminGuard()
  @Get()
  async getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.usersAdminService.getUsers({ page, limit });
  }

  @AdminGuard()
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.usersAdminService.getUser(id);
  }

  @AdminGuard()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersAdminService.create(createUserDto);
  }

  @AdminGuard()
  @Post('deactivate')
  async deactivateUser(userId: number) {
    return this.usersAdminService.deactivateUser(userId);
  }

  @AdminGuard()
  @Post(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersAdminService.update(userId, payload);
  }
}
