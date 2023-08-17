import { User } from '@/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
