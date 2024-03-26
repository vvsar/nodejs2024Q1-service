import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  duration: number;

  artistId: string | null;

  albumId: string | null;
}
