import { RequestWithUser } from '@/type';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthAdminService } from './authAdmin.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AdminGuard } from '@/decorators/roles.decorators';

@ApiTags('admin/auth')
@Controller('admin/auth')
export class AuthAdminController {
  constructor(private readonly authService: AuthAdminService) {}

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

  // @Post('/register')
  // register(@Body() body: RegisterDto) {
  //   return this.authService.register(body);
  // }
}
