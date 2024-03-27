import {
  Injectable,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import { FavoriteAlbum } from './interfaces/fav-album.entity';
import { FavoriteArtist } from './interfaces/fav-artist.entity';
import { FavoriteTrack } from './interfaces/fav-track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private favAlbumRepo: Repository<FavoriteAlbum>,
    @InjectRepository(FavoriteArtist)
    private favArtistRepo: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteTrack)
    private favTrackRepo: Repository<FavoriteTrack>,
    private artistRepo: ArtistService,
    private albumRepo: AlbumService,
    private trackRepo: TrackService,
  ) {}

  async findAll() {
    const favAlbums = await this.favAlbumRepo.find({
      relations: {
        favorite: true,
      },
    });
    const albums = favAlbums.map((item) => item.favorite);

    const favArtists = await this.favArtistRepo.find({
      relations: {
        favorite: true,
      },
    });
    const artists = favArtists.map((item) => item.favorite);

    const favTracks = await this.favTrackRepo.find({
      relations: {
        favorite: true,
      },
    });
    const tracks = favTracks.map((item) => item.favorite);

    return { albums, artists, tracks };
  }

  async addAlbumToFavs(id: string) {
    const items = await this.albumRepo.findAll();
    const item = items.find((el) => el.id === id);
    if (item) {
      const album = await this.favAlbumRepo.save({ favorite: { id } });
      return album.favorite;
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeAlbumFromFavs(id: string) {
    const album = await this.favAlbumRepo.findOneBy({
      favorite: { id },
    });
    if (!album) {
      throw new HttpException(
        `Album ${id} is not in favorites`,
        StatusCodes.NOT_FOUND,
      );
    }

    return this.favAlbumRepo.remove(album);
  }

  async addArtistToFavs(id: string) {
    const items = await this.artistRepo.findAll();
    const item = items.find((el) => el.id === id);
    if (item) {
      const artist = await this.favArtistRepo.save({ favorite: { id } });
      return artist.favorite;
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeArtistFromFavs(id: string) {
    const artist = await this.favArtistRepo.findOneBy({
      favorite: { id },
    });
    if (!artist) {
      throw new HttpException(
        `Artist ${id} is not in favorites`,
        StatusCodes.NOT_FOUND,
      );
    }

    return this.favArtistRepo.remove(artist);
  }

  async addTrackToFavs(id: string) {
    const items = await this.trackRepo.findAll();
    const item = items.find((el) => el.id === id);
    if (item) {
      const track = await this.favTrackRepo.save({ favorite: { id } });
      return track.favorite;
    } else {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrackFromFavs(id: string) {
    const track = await this.favTrackRepo.findOneBy({
      favorite: { id },
    });
    if (!track) {
      throw new HttpException(
        `Artist ${id} is not in favorites`,
        StatusCodes.NOT_FOUND,
      );
    }

    return this.favTrackRepo.remove(track);
  }
}
