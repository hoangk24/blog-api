import { RequestWithUser } from '@/@types/user';
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
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { AdminGuard } from '@/decorators/roles.decorators';
import { RegisterDto } from './dto/register.dto';

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
  @AdminGuard()
  @Get('/me')
  getMe(@Request() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }
}
