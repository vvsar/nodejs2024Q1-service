import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as createUuid } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './interfaces/user.entity';

@Injectable()
export class UserService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateUserDto): UserEntity {
    const id = createUuid();
    const date = Date.now();
    const user: UserEntity = new UserEntity({
      id: id,
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this.db.users.push(user);
    return user;
  }

  findAll(): UserEntity[] {
    return this.db.users;
  }

  findOne(id: string): UserEntity {
    const user = this.db.users.find((item) => item.id === id);
    if (!user) {
      // to edit
      throw new Error('Not found');
    }
    return user;
  }

  update(id: string, dto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);
    if (!user) {
      // to edit
      throw new Error('Not found');
    }
    if (user.password != dto.oldPassword) {
      // to edit
      throw new Error('Check password');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  delete(id: string) {
    const user = this.findOne(id);
    if (!user) {
      // to edit
      throw new Error('Not found');
    }
    this.db.users = this.db.users.filter((item) => item.id != user.id);
  }
}
