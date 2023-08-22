import { BaseEntity } from '@/core/base.entity';
import { UserRole, UserWithoutPrivateFields } from '@/model/user';
import { Post } from '@/post/entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';
import { compare } from 'bcrypt';
import { omit } from 'lodash';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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

  @Column({ nullable: true })
  banner?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Post, (post) => post.usersFavored)
  favoredPost: Post[];

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[];

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'friendship',
    joinColumn: { name: 'friendId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  friendRequests: User[];

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
