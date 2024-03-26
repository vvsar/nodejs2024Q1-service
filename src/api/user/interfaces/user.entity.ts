import { User } from './user.interface';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@Entity()
export class UserEntity implements User {
  // @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn()
  id: string;

  // @ApiProperty({ example: 'new_user' })
  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  // @ApiPropertyOptional({ example: 1 })
  @VersionColumn()
  version: number;

  // @ApiPropertyOptional({ example: 1000000000 })
  @CreateDateColumn()
  @Type(() => Number)
  createdAt: number;

  // @ApiPropertyOptional({ example: 1000000000 })
  @UpdateDateColumn()
  @Type(() => Number)
  updatedAt: number;

  // constructor(data: UserEntity) {
  //   Object.assign(this, data);
  // }
}
