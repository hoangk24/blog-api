import { LoginDto } from '@/auth/dto/login.dto';
import { UserRole, UserWithoutPrivateFields } from '@/model/user';
import { User } from '@/user/entities/user.entity';
import { UsersService } from '@/user/user.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthAdminService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async loginAdmin(payload: LoginDto) {
    const user = await this.validateUserCredentials(payload);

    if (user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission.');
    }

    const token = await this.generateJsonWebToken(user);

    return {
      user,
      accessToken: token,
    };
  }

  async validateUserCredentials({
    password,
    email,
    username,
  }: LoginDto): Promise<UserWithoutPrivateFields> {
    const user = await this.userService
      .queryBuilder()
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

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
