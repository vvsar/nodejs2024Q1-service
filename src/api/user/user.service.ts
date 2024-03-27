import {
  Injectable,
  NotFoundException,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './interfaces/user.entity';
import { StatusCodes } from 'http-status-codes';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    const { login, password } = dto;
    if (
      !login ||
      typeof login != 'string' ||
      !password ||
      typeof password != 'string'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const id = createUuid();
    const date = Date.now();

    const entity = this.userRepo.create({
      id,
      login,
      password,
      version: 1,
      createdAt: date,
      updatedAt: date,
    });
    this.userRepo.save(entity);
    return this.userWithoutPassword(entity);
  }

  async findAll() {
    const users = await this.userRepo.find();
    return users.map((item) => this.userWithoutPassword(item));
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userWithoutPassword(user);
  }

  async update(id: string, dto: UpdateUserDto) {
    if (
      !dto.oldPassword ||
      typeof dto.oldPassword != 'string' ||
      !dto.newPassword ||
      typeof dto.newPassword != 'string'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password != dto.oldPassword) {
      throw new ForbiddenException('Check old password');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    const updatedUser = await this.userRepo.save({ ...user, ...dto });
    return this.userWithoutPassword(updatedUser);
  }

  async delete(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }

  private userWithoutPassword = (user: Partial<User>) => ({
    id: user.id,
    login: user.login,
    version: user.version,
    createdAt: +user.createdAt,
    updatedAt: +user.updatedAt,
  });
}
