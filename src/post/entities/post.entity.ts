import { BaseEntity } from '@/core/base.entity';
import { User } from '@/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column({ nullable: true })
  posterId?: number;

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
