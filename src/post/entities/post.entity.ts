import { BaseEntity } from '@/core/base.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  posterId: number;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  content: string;

  @Column()
  thumbnail: string;

  @Column()
  shortTitle: string;

  @Column()
  published: string;

  @Column()
  slug: string;

  @OneToMany(() => Tag, (tag) => tag.post)
  tags: Tag[];
}
