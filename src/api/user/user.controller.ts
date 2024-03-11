import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
// import { Request } from 'express';
// import { User } from './interfaces/user.interface.js';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './interfaces/user.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { StatusCodes } from 'http-status-codes';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto): UserEntity {
    return this.userService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): UserEntity {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.delete(id);
  }
}
