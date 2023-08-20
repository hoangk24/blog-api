import { BaseEntity } from '@/core/base.entity';
import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: true })
  poster?: string;

  @Column()
  title: string;

  @Column({
    type: 'longtext',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column({
    default: 0,
  })
  viewCount: number;

  @OneToMany(() => User, (user) => user.favoredPost)
  usersFavored: User[];

  @Column({ default: false })
  isApproved: boolean;
}
