import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as createUuid } from 'uuid';

@Injectable()
export class UserService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateUserDto): Omit<User, 'password'> {
    const id = createUuid();
    const date = Date.now();
    const user = {
      id: id,
      login: dto.login,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };
    this.db.users.push(user);
    return user;
  }

  findAll(): Omit<User, 'password'>[] {
    return this.db.users;
  }
}
