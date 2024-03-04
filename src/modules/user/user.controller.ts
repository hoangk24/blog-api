import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { UsersService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // async register(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('like-post')
  // async likePost(
  //   @Request() req: RequestWithUser,
  //   @Body() payload: LikePostDto,
  // ) {
  //   return this.usersService.likePost(payload, req.user);
  // }
}
