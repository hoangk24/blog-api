import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('/admin/login')
  loginAdmin(@Body() payload: LoginDto) {
    return this.authService.loginAdmin(payload);
  }

  @Post('/register')
  register(@Body() body: CreateAuthDto) {
    return this.authService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-me')
  getMe(@Request() req: RequestWithUser) {
    // return req.user;
  }
}
