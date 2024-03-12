import {
  Injectable,
  NotFoundException,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './interfaces/user.entity';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class UserService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateUserDto): UserEntity {
    if (
      !dto.login ||
      typeof dto.login != 'string' ||
      !dto.password ||
      typeof dto.password != 'string'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
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
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const user = this.db.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, dto: UpdateUserDto): UserEntity {
    if (
      !dto.oldPassword ||
      typeof dto.oldPassword != 'string' ||
      !dto.newPassword ||
      typeof dto.newPassword != 'string'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const user = this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password != dto.oldPassword) {
      throw new ForbiddenException('Check old password');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }

  delete(id: string) {
    const user = this.findOne(id);
    this.db.users = this.db.users.filter((item) => item.id != user.id);
  }
}
