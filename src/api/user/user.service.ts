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

    return this.userRepo.save(entity);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepo.find();
  }

  findOne(id: string): Promise<UserEntity | null> {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const user = this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    if (
      !dto.oldPassword ||
      typeof dto.oldPassword != 'string' ||
      !dto.newPassword ||
      typeof dto.newPassword != 'string'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password != dto.oldPassword) {
      throw new ForbiddenException('Check old password');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return this.userRepo.save({ ...user, ...dto });
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
