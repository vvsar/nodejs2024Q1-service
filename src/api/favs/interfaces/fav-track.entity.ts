import { TrackEntity } from 'src/api/track/interfaces/track.entity';
import { FavoriteEntity } from './fav.interface';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteTrack implements FavoriteEntity<TrackEntity> {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId' })
  favorite: TrackEntity;
}
