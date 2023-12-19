import { BaseEntity } from '@/core/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tag } from './tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/user/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  poster: string;

  @ApiProperty()
  @Column({
    type: 'longtext',
    nullable: true,
  })
  content: string;

  @ApiProperty()
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty()
  @Column({ nullable: true })
  shortTitle: string;

  @ApiProperty()
  @Column({ nullable: true })
  published: string;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
