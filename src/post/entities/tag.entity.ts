import { BaseEntity } from '@/core/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany } from 'typeorm';
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
  @ManyToMany(() => Post)
  posts: Post[];
}
