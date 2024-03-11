import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { v4 as createUuid } from 'uuid';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateAlbumDto) {
    const id = createUuid();
    const album: Album = {
      id: id,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    this.db.albums.push(album);
    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string): Album {
    const album = this.db.albums.find((item) => item.id === id);
    if (!album) {
      // to edit
      throw new Error('Not found');
    }
    return album;
  }
}
