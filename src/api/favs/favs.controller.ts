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
  favsService: FavsService;
  constructor(favsService: FavsService) {
    this.favsService = favsService;
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post(':type/:id')
  add(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favsService.addToFavorites(id, type);
  }

  @Delete(':type/:id')
  @HttpCode(204)
  delete(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('type') type: string,
  ) {
    return this.favsService.removeFromFavorites(id, type);
  }
}
