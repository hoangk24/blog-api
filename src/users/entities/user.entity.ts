import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { UserWithoutPrivateFields } from '@/model/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  static removePrivateField(user: User): UserWithoutPrivateFields {
    return omit(user, 'password', 'isActive');
  }

  static async comparePassword(
    currentPassword: string,
    password: string,
  ): Promise<boolean> {
    return compare(currentPassword, password);
  }
}
