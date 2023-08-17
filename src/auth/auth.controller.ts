import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { PrivateRoute } from './auth.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: LoginDto })
  login(@Request() req: RequestWithUser) {
    return {
      user: req.user,
      accessToken: this.authService.generateJsonWebToken(req.user),
    };
  }

  @Post('/register')
  register(@Body() body: CreateAuthDto) {
    return this.authService.create(body);
  }

  @PrivateRoute()
  @Get('/get-me')
  getMe(@Request() req: RequestWithUser) {
    return req.user;
  }
}
