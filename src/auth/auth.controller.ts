import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LoginDto,
  })
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
