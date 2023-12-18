import { BaseEntity } from '@/core/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Tag extends BaseEntity {
  @ApiProperty()
  @Column()
  label: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @OneToMany(() => Post, (post) => post.tags)
  post: Post[];
}
