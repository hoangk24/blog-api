import { BaseEntity } from '@/core/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column()
  name: string;

  @Column()
  fileType: string;

  @Column()
  url: string;

  @Column()
  size: number;
}
