import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './interfaces/album.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
})
export class AlbumModule {}
