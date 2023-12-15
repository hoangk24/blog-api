import { BaseEntity } from '@/core/base.entity';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  label: string;

  @Column()
  description: string;

  @OneToMany(() => Post, (post) => post.tags)
  post: Post[];

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
