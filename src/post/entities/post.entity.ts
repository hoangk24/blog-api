import { BaseEntity } from '@/core/base.entity';
import { User } from '@/user/entities/user.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  posterId: number;

  @Column({
    type: 'longtext',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
