import { Injectable } from '@nestjs/common';
import { Album } from 'src/api/album/interfaces/album.interface';
import { UserEntity } from 'src/api/user/interfaces/user.entity';

// const enum DatabaseEntities {
//   Users = 'users',
//   Artists = 'artists',
//   Albums = 'albums',
//   Tracks = 'tracks',
// }

@Injectable()
export class DatabaseService {
  users: UserEntity[] = [];
  albums: Album[] = [];

  // checkEntityExistence(id: string, type: DatabaseEntities): boolean {
  //   if (id) {
  //     const rep: UserEntity[] | Album[] = this[type];
  //     const entity = rep.find((item) => item.id === id);
  //     return entity ? true : false;
  //   }
  // }
}
