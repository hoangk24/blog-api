import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';

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

  // @Get('me')
  // getMe(@Request() req: RequestWithUser) {
  //   return req.user;
  // }
}
