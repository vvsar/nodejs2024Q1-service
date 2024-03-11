import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  albumService: AlbumService;

  constructor(albumService: AlbumService) {
    this.albumService = albumService;
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Album {
    return this.albumService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAlbumDto): Album {
    return this.albumService.create(dto);
  }
}
