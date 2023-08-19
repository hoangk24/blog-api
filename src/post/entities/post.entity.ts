import { User } from '@/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  poster?: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
