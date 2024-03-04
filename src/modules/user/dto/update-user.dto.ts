import { UserRole } from '@/models/user';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
