import { Track } from 'src/api/track/interfaces/track.interface';
import { Artist } from 'src/api/artist/interfaces/artist.interface';
import { Album } from 'src/api/album/interfaces/album.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export enum FavEntities {
  tracks = 'tracks',
  albums = 'albums',
  artists = 'artists',
}

export type Entity = Artist | Album | Track | null;
