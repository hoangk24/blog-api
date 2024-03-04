import { RequestWithUser } from '@/@types/user';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '@/guards/local-auth.guard';
import { AdminGuard } from '@/decorators/roles.decorators';

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
}
