import { ArtistEntity } from 'src/api/artist/interfaces/artist.entity';
import { FavoriteEntity } from './fav.interface';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteArtist implements FavoriteEntity<ArtistEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId' })
  favorite: ArtistEntity;
}
