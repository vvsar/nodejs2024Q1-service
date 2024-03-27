import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAlbum } from './interfaces/fav-album.entity';
import { FavoriteArtist } from './interfaces/fav-artist.entity';
import { FavoriteTrack } from './interfaces/fav-track.entity';
// import { AlbumService } from '../album/album.service';
// import { ArtistService } from '../artist/artist.service';
// import { TrackService } from '../track/track.service';
import { AlbumModule } from '../album/album.module';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
// import { ArtistModule } from '../artist/artist.module';
// import { TrackModule } from '../track/track.module';
// import { AlbumController } from '../album/album.controller';
// import { ArtistController } from '../artist/artist.controller';
// import { TrackController } from '../track/track.controller';
// import { AlbumEntity } from '../album/interfaces/album.entity';
// import { ArtistEntity } from '../artist/interfaces/artist.entity';
// import { TrackEntity } from '../track/interfaces/track.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([FavoriteAlbum, FavoriteArtist, FavoriteTrack]),
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  exports: [FavsService],
})
export class FavsModule {}
