import { UserWithoutPrivateFields } from '@/model/user';
import { User } from '@/user/entities/user.entity';
import { UsersService } from '@/user/users.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login({ password, username }: LoginDto) {
    const user = await this.validateUserCredentials(username, password);
    const accessToken = await this.generateJsonWebToken(user);
    return {
      user,
      accessToken,
    };
  }

  async create(createUser: CreateAuthDto): Promise<{
    user: UserWithoutPrivateFields;
    accessToken: string;
  }> {
    const user = await this.userService.create(createUser);

    return {
      user,
      accessToken: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<UserWithoutPrivateFields> {
    const user = await this.userService.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not exits.');
    }
    if (!User.comparePassword(password, user.password)) {
      throw new UnauthorizedException('username or password is invalid.');
    }

    if (!user.isActive) throw new ForbiddenException();

    return User.removePrivateField(user);
  }

  generateJsonWebToken(user: UserWithoutPrivateFields): string {
    return this.jwtService.sign({
      id: user.id,
    });
  }
}
