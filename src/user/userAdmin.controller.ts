import { ApiTags } from '@nestjs/swagger';
import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersAdminService } from './userAdmin.service';

@ApiTags('admin/users')
@Controller('admin/users')
export class UsersAdminController {
  constructor(private readonly usersAdminService: UsersAdminService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersAdminService.create(createUserDto);
  }
}
