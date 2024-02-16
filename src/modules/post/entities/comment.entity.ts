import { BaseEntity } from '@/cores/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  email: string;

  @Column()
  content: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
