import {
  Controller,
  Get,
  Post,
  Body,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
// import { Request } from 'express';
import { User } from './interfaces/user.interface.js';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('user')
// @UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() dto: CreateUserDto): Omit<User, 'password'> {
    return this.userService.create(dto);
  }
}
