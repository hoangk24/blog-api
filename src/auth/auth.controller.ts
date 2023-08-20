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
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  login(@Request() req: RequestWithUser) {
    return {
      user: req.user,
      accessToken: this.authService.generateJsonWebToken(req.user),
    };
  }

  @Post('/admin/login')
  @ApiBody({ type: LoginDto })
  loginAdmin(@Request() req: RequestWithUser) {
    return {
      user: req.user,
      accessToken: this.authService.generateJsonWebToken(req.user),
    };
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
