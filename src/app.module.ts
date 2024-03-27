import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { TrackModule } from './api/track/track.module';
import { FavsModule } from './api/favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/data-source';
import { AlbumEntity } from './api/album/interfaces/album.entity';
import { ArtistEntity } from './api/artist/interfaces/artist.entity';
import { TrackEntity } from './api/track/interfaces/track.entity';
import { FavoriteAlbum } from './api/favs/interfaces/fav-album.entity';
import { FavoriteArtist } from './api/favs/interfaces/fav-artist.entity';
import { FavoriteTrack } from './api/favs/interfaces/fav-track.entity';

const options = dataSource.options;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${__dirname}/.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...options,
      synchronize: true, //temp
      entities: [`${__dirname}/api/**/*.entity{.ts,.js}`],
      // migrations: [`${__dirname}/database/migrations/*.ts`],
      migrations: [],
    }),
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavsModule,
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteAlbum,
      FavoriteArtist,
      FavoriteTrack,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
