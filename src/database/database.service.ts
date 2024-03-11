import { Injectable } from '@nestjs/common';
import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { UserEntity } from 'src/api/user/interfaces/user.entity';

export const enum DatabaseEntities {
  Users = 'users',
  Artists = 'artists',
  Albums = 'albums',
  Tracks = 'tracks',
}

@Injectable()
export class DatabaseService {
  users: UserEntity[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];

  checkEntityExistence(id: string, type: DatabaseEntities): boolean {
    if (id) {
      const rep: (UserEntity | Album)[] = this[type];
      const entity = rep.find((item) => item.id === id);
      return entity ? true : false;
    }
  }
}
