import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as createUuid } from 'uuid';
import { isUUID } from 'class-validator';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { StatusCodes } from 'http-status-codes';
import { ArtistEntity } from './interfaces/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
  ) {}

  create(dto: CreateArtistDto) {
    const { name, grammy } = dto;
    if (
      !name ||
      typeof name != 'string' ||
      !grammy ||
      typeof grammy != 'boolean'
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    const id = createUuid();
    const entity = this.artistRepo.create({
      id: id,
      name: name,
      grammy: grammy,
    });
    return this.artistRepo.save(entity);
  }

  findAll() {
    return this.artistRepo.find();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Invalid id', StatusCodes.BAD_REQUEST);
    }
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const keys = Object.keys(dto);
    const nameIsGiven = keys.find((item) => item === 'name');
    const grammyIsGiven = keys.find((item) => item === 'grammy');
    if (
      (nameIsGiven && typeof dto.name != 'string') ||
      (grammyIsGiven && typeof dto.grammy != 'boolean')
    ) {
      throw new HttpException('Invalid data', StatusCodes.BAD_REQUEST);
    }
    return this.artistRepo.save({ ...artist, ...dto });
  }

  async delete(id: string) {
    const artist = await this.artistRepo.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('User not found');
    }
    return this.artistRepo.remove(artist);
  }
}
