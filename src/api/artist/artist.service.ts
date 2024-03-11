import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { Artist } from './interfaces/artist.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class ArtistService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateArtistDto) {
    if (
      !dto.name ||
      typeof dto.name != 'string' ||
      !dto.grammy ||
      typeof dto.grammy != 'boolean'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const id = createUuid();
    const artist: Artist = {
      id: id,
      name: dto.name,
      grammy: dto.grammy,
    };
    this.db.artists.push(artist);
    return artist;
  }

  findAll() {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const artist = this.db.artists.find((item) => item.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  update(id: string, dto: UpdateArtistDto): Artist {
    if (
      !isUUID(id) ||
      (dto.name && typeof dto.name != 'string') ||
      (dto.grammy && typeof dto.grammy != 'boolean')
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const artist = this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    if (dto.name) {
      artist.name = dto.name;
    }
    if (dto.grammy) {
      artist.grammy = dto.grammy;
    }
    return artist;
  }

  delete(id: string) {
    const artist = this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.db.albums.forEach((item) => {
      if (item.artistId === id) {
        item.artistId = null;
      }
    });
    this.db.artists = this.db.artists.filter((item) => item.id != artist.id);
  }
}
