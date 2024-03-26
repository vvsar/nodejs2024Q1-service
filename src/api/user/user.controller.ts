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
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserEntity } from './interfaces/user.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { StatusCodes } from 'http-status-codes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    console.log('Method POST called');
    const entity = await this.userService.create(dto);
    console.log(entity);
    return entity;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.userService.delete(id);
  }
}
