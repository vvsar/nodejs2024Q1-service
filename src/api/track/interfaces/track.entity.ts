import { Track } from './track.interface';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from 'src/api/artist/interfaces/artist.entity';

@Entity()
export class TrackEntity implements Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  @OneToOne(() => ArtistEntity, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  // @OneToOne(() => AlbumEntity, {
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn({ name: 'albumId' })
  albumId: string | null;
}
