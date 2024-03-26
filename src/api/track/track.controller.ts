import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() dto: CreateTrackDto) {
    return this.trackService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.trackService.delete(id);
  }
}
