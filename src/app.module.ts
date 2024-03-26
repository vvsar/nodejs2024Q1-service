import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
// import { DatabaseService } from './database/database.service';
// import { DatabaseModule } from './database/database.module';
// import { AlbumController } from './api/album/album.controller';
// import { AlbumService } from './api/album/album.service';
// import { AlbumModule } from './api/album/album.module';
import { ArtistModule } from './api/artist/artist.module';
import { TrackModule } from './api/track/track.module';
// import { FavsModule } from './api/favs/favs.module';
// import { FavsController } from './api/favs/favs.controller';
// import { FavsService } from './api/favs/favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './database/data-source';

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
    // DatabaseModule,
    // AlbumModule,
    ArtistModule,
    TrackModule,
    // FavsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
