import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import {
  DatabaseService,
  // DatabaseEntities,
} from '../../database/database.service';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class TrackService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  create(dto: CreateTrackDto) {
    if (
      !dto.name ||
      typeof dto.name != 'string' ||
      !dto.duration ||
      typeof dto.duration != 'number'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    // const artistExists = this.db.checkEntityExistence(
    //   dto.artistId,
    //   DatabaseEntities.Artists,
    // );
    // if (!artistExists) {
    //   throw new NotFoundException('Artist not found');
    // }
    // const albumExists = this.db.checkEntityExistence(
    //   dto.albumId,
    //   DatabaseEntities.Albums,
    // );
    // if (!albumExists) {
    //   throw new NotFoundException('Album not found');
    // }
    const id = createUuid();
    const track: Track = {
      id: id,
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId,
    };
    this.db.tracks.push(track);
    return track;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string): Track {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = this.db.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  update(id: string, dto: UpdateTrackDto): Track {
    if (
      (dto.name && typeof dto.name != 'string') ||
      (dto.duration && typeof dto.duration != 'number') ||
      (dto.artistId && isUUID(dto.artistId)) ||
      (dto.albumId && isUUID(dto.albumId))
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const track = this.findOne(id);
    if (!track) {
      throw new NotFoundException('Album not found');
    }
    if (dto.name) {
      track.name = dto.name;
    }
    if (dto.duration) {
      track.duration = dto.duration;
    }
    if (dto.artistId) {
      track.artistId = dto.artistId;
    }
    if (dto.albumId) {
      track.albumId = dto.albumId;
    }
    return track;
  }

  delete(id: string) {
    const track = this.findOne(id);
    this.db.tracks = this.db.tracks.filter((item) => item.id != track.id);
  }
}
