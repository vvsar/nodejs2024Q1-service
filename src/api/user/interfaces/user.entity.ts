import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
