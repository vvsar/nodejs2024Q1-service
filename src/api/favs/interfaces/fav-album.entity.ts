import { AlbumEntity } from 'src/api/album/interfaces/album.entity';
import { FavoriteEntity } from './fav.interface';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteAlbum implements FavoriteEntity<AlbumEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToOne(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId' })
  favorite: AlbumEntity;
}
