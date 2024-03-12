import { Injectable } from '@nestjs/common';
import { Album } from 'src/api/album/interfaces/album.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { Track } from 'src/api/track/interfaces/track.interface';
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
  tracks: Track[] = [];

  checkEntityExistence(id: string, type: DatabaseEntities): boolean {
    if (id) {
      const rep: (UserEntity | Album | Artist | Track)[] = this[type];
      const entity = rep.find((item) => item.id === id);
      return entity ? true : false;
    }
  }
}
