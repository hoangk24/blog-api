import { UserRole, UserWithoutPrivateFields } from '@/model/user';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/auth/dto/login.dto';

@Injectable()
export class AuthAdminService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async loginAdmin({ password, username }: LoginDto) {
    const user = await this.validateUserCredentials(username, password);
    console.log(user);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission.');
    }
    return {
      user,
      accessToken: await this.generateJsonWebToken(user),
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
