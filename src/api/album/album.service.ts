import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import {
  DatabaseService,
  DatabaseEntities,
} from '../../database/database.service';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { Album } from './interfaces/album.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AlbumService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateAlbumDto) {
    if (
      !dto.name ||
      typeof dto.name != 'string' ||
      !dto.year ||
      typeof dto.year != 'number' ||
      !dto.artistId ||
      isUUID(dto.artistId)
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const artistExists = this.db.checkEntityExistence(
      dto.artistId,
      DatabaseEntities.Artists,
    );
    if (dto.artistId && !artistExists) {
      throw new NotFoundException('Artist not found');
    }
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
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  update(id: string, dto: UpdateAlbumDto): Album {
    if (
      (dto.name && typeof dto.name != 'string') ||
      (dto.year && typeof dto.year != 'number') ||
      (dto.artistId && isUUID(dto.artistId))
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const album = this.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    if (dto.name) {
      album.name = dto.name;
    }
    if (dto.year) {
      album.year = dto.year;
    }
    if (dto.artistId) {
      album.artistId = dto.artistId;
    }
    return album;
  }

  delete(id: string) {
    const album = this.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.db.albums = this.db.albums.filter((item) => item.id != album.id);
  }
}
