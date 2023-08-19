import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { UserWithoutPrivateFields } from '@/model/user';
import { Post } from '@/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  fullName: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Post, (post) => post.usersFavored)
  favoredPost: Post[];

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
