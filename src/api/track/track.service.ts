import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { Track } from './interfaces/track.interface';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { TrackEntity } from './interfaces/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity) private trackRepo: Repository<TrackEntity>,
  ) {}

  create(dto: CreateTrackDto) {
    if (
      !dto.name ||
      typeof dto.name != 'string' ||
      !dto.duration ||
      typeof dto.duration != 'number'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }

    const id = createUuid();
    // const track: Track = {
    //   id: id,
    //   name: dto.name,
    //   duration: dto.duration,
    //   artistId: dto.artistId,
    //   albumId: dto.albumId,
    // };
    const entity = this.trackRepo.create({
      id: id,
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId,
      albumId: dto.albumId,
    });
    return this.trackRepo.save(entity);
  }

  findAll() {
    return this.trackRepo.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async update(id: string, dto: UpdateTrackDto) {
    if (
      (dto.name && typeof dto.name != 'string') ||
      (dto.duration && typeof dto.duration != 'number') ||
      (dto.artistId && isUUID(dto.artistId)) ||
      (dto.albumId && isUUID(dto.albumId))
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Album not found');
    }
    // if (dto.name) {
    //   track.name = dto.name;
    // }
    // if (dto.duration) {
    //   track.duration = dto.duration;
    // }
    // if (dto.artistId) {
    //   track.artistId = dto.artistId;
    // }
    // if (dto.albumId) {
    //   track.albumId = dto.albumId;
    // }
    return this.trackRepo.save({ ...track, ...dto });
  }

  async delete(id: string) {
    const track = await this.trackRepo.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.trackRepo.remove(track);
  }
}
