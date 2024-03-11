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

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AlbumModule,
  ],
  controllers: [AppController, UserController, AlbumController],
  providers: [AppService, UserService, DatabaseService, AlbumService],
})
export class AppModule {}
