import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { StatusCodes } from 'http-status-codes';
import { AlbumEntity } from './interfaces/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity) private albumRepo: Repository<AlbumEntity>,
  ) {}

  create(dto: CreateAlbumDto) {
    if (
      !dto.name ||
      typeof dto.name != 'string' ||
      !dto.year ||
      typeof dto.year != 'number'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }

    const id = createUuid();
    const entity = this.albumRepo.create({
      id: id,
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    });
    return this.albumRepo.save(entity);
  }

  findAll() {
    return this.albumRepo.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: string, dto: UpdateAlbumDto) {
    if (
      (dto.name && typeof dto.name != 'string') ||
      (dto.year && typeof dto.year != 'number') ||
      (dto.artistId && !isUUID(dto.artistId))
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumRepo.save({ ...album, ...dto });
  }

  async delete(id: string) {
    const album = await this.albumRepo.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumRepo.remove(album);
  }
}
