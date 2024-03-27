import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service.js';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeAlbumFromFavs(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeArtistFromFavs(id);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeTrackFromFavs(id);
  }
}
