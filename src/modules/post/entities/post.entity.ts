import { BaseEntity } from '@/cores/base.entity';
import { User } from '@/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @Column({ nullable: true })
  banner: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  published: string;

  @ApiProperty()
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
