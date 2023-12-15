import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthAdminService } from './authAdmin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('admin/auth')
@Controller('admin/auth')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

  @Post('/login')
  login(@Body() payload: LoginDto) {
    return this.authService.loginAdmin(payload);
  }
}
