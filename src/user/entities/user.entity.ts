import { BaseEntity } from '@/cores/base.entity';
import { UserRole, UserWithoutPrivateFields } from '@/models/user';
import { Post } from '@/post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  isActive: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  banner?: string;

  @ApiProperty()
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ nullable: true })
  address?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

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
