import { BaseEntity } from '@/core/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post extends BaseEntity {
  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  poster: number;

  @ApiProperty()
  @Column({
    type: 'longtext',
    nullable: true,
  })
  content: string;

  @ApiProperty()
  @Column()
  thumbnail: string;

  @ApiProperty()
  @Column()
  shortTitle: string;

  @ApiProperty()
  @Column()
  published: string;

  @ApiProperty()
  @Column()
  slug: string;

  @OneToMany(() => Tag, (tag) => tag.post)
  tags: Tag[];
}
