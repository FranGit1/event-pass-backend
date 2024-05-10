import { PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @AutoMap()
  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @AutoMap()
  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt?: Date;
}
