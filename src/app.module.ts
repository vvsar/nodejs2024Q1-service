import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';
import { DatabaseService } from './database/database.service';
import { DatabaseModule } from './database/database.module';
import { AlbumController } from './api/album/album.controller';
import { AlbumService } from './api/album/album.service';
import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { ArtistController } from './api/artist/artist.controller';
import { ArtistService } from './api/artist/artist.service';
import { TrackModule } from './api/track/track.module';
import { TrackController } from './api/track/track.controller';
import { TrackService } from './api/track/track.service';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
  ],
  controllers: [
    AppController,
    UserController,
    AlbumController,
    ArtistController,
    TrackController,
  ],
  providers: [
    AppService,
    UserService,
    DatabaseService,
    AlbumService,
    ArtistService,
    TrackService,
  ],
})
export class AppModule {}
