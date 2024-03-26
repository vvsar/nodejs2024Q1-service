import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserController } from './api/user/user.controller';
// import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';
// import { DatabaseService } from './database/database.service';
// import { DatabaseModule } from './database/database.module';
// import { AlbumController } from './api/album/album.controller';
// import { AlbumService } from './api/album/album.service';
// import { AlbumModule } from './api/album/album.module';
// import { ArtistModule } from './api/artist/artist.module';
// import { ArtistController } from './api/artist/artist.controller';
// import { ArtistService } from './api/artist/artist.service';
// import { TrackModule } from './api/track/track.module';
// import { TrackController } from './api/track/track.controller';
// import { TrackService } from './api/track/track.service';
// import { FavsModule } from './api/favs/favs.module';
// import { FavsController } from './api/favs/favs.controller';
// import { FavsService } from './api/favs/favs.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { dataSource } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        host: 'db',
        database: configService.get('POSTGRES_DB'),
        port: +configService.get('POSTGRES_PORT'),
        synchronize: false,
        entities: [`${__dirname}/api/**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/database/migrations/*.ts`],
      }),
    }),
    UserModule,
    // DatabaseModule,
    // AlbumModule,
    // ArtistModule,
    // TrackModule,
    // FavsModule,
  ],
  controllers: [
    AppController,
    // UserController,
    // AlbumController,
    // ArtistController,
    // TrackController,
    // FavsController,
  ],
  providers: [
    AppService,
    // UserService,
    // DatabaseService,
    // AlbumService,
    // ArtistService,
    // TrackService,
    // FavsService,
  ],
})
export class AppModule {}
