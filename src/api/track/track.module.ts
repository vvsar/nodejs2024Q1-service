import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './interfaces/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  exports: [TrackService],
})
export class TrackModule {}
