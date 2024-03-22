import { Injectable, HttpException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { Entity } from './interfaces/fav.interface';
// import { isUUID } from 'class-validator';

import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavsService {
  db: DatabaseService;
  constructor(database: DatabaseService) {
    this.db = database;
  }

  addToFavorites(id: string, type: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException(
    //     `${id} is not valid UUID`,
    //     StatusCodes.BAD_REQUEST,
    //   );
    // }
    // if (type != 'album' && type != 'artist' && type != 'track') {
    //   throw new HttpException(
    //     `Type ${type} does not exist`,
    //     StatusCodes.BAD_REQUEST,
    //   );
    // }

    const entity: Entity = this.db[type + 's'].find(
      (item: Entity) => item.id === id,
    );

    if (!entity) {
      throw new HttpException(
        `${type} with ${id} does not exist`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    const alreadyInFavs = this.db.favorites[type + 's'].some(
      (favoriteItem: Entity) => favoriteItem.id === id,
    );
    if (alreadyInFavs) {
      throw new Error(`${type} with ID ${id} is already in favorites`);
    }
    this.db.favorites[type + 's'].push(id);
    return entity;
  }

  findAll() {
    console.log('findAll called');
    const entitiesFromIndexes = (resources: Entity[], indexes: string[]) => {
      return resources.filter((item) => indexes.includes(item.id));
    };
    return {
      artists: entitiesFromIndexes(this.db.artists, this.db.favorites.artists),
      albums: entitiesFromIndexes(this.db.albums, this.db.favorites.albums),
      tracks: entitiesFromIndexes(this.db.tracks, this.db.favorites.tracks),
    };
  }

  removeFromFavorites(id: string, type: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException(
    //     `${id} is not valid UUID`,
    //     StatusCodes.BAD_REQUEST,
    //   );
    // }
    // if (type != 'album' && type != 'artist' && type != 'track') {
    //   throw new HttpException(
    //     `Type ${type} does not exist`,
    //     StatusCodes.BAD_REQUEST,
    //   );
    // }

    const index = this.db.favorites[type + 's'].indexOf(id);
    this.db.favorites[type + 's'].splice(index, 1);
  }
}
