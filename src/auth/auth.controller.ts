import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';
import { ApplyUser } from './auth.decorator';
import { RequestWithUser } from '@/type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('/register')
  register(@Body() body: CreateAuthDto) {
    return this.authService.create(body);
  }

  @ApplyUser()
  @Get('get-me')
  getMe(@Request() req: RequestWithUser) {
    return req.user;
  }
}
