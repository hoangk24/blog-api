import { ApplyUser, ApplyUserOrNot } from '@/auth/auth.decorator';
import { RequestWithOptionUser, RequestWithUser } from '@/type';
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApplyUserOrNot()
  @Get('profile/:id')
  async getProfile(
    @Request() req: RequestWithOptionUser,
    @Param('id') id: number,
  ) {
    return this.usersService.getProfile(id, req?.user.id);
  }

  @ApplyUser()
  @Get('my-friends')
  async getMyFriends(@Request() req: RequestWithUser) {
    return this.usersService.getMyFriends(req.user.id);
  }

  @Post()
  @ApplyUser()
  async updateInformation(
    @Request() req: RequestWithUser,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(req.user.id, payload);
  }

  @ApplyUser()
  @Post('accept-friend/:id')
  async acceptFriend(@Request() req: RequestWithUser, @Param('id') id: number) {
    return this.usersService.acceptFriend(req.user.id, id);
  }

  @ApplyUser()
  @Post('add-friend/:id')
  async addFriends(@Request() req: RequestWithUser, @Param('id') id: number) {
    return this.usersService.addFriend(req.user.id, id);
  }

  @ApplyUser()
  @Post('un-friend/:id')
  async unFriend(@Request() req: RequestWithUser, @Param('id') id: number) {
    return this.usersService.unFriend(req.user.id, id);
  }

  @ApplyUser()
  @Post('cancel-add-friend/:id')
  async cancelAddFriends(
    @Request() req: RequestWithUser,
    @Param('id') id: number,
  ) {
    return this.usersService.cancelAddFriend(req.user.id, id);
  }

  async findOne(@Param('id') id: number) {
    return this.usersService.findOne({
      where: {
        id,
      },
    });
  }
}
