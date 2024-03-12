import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  duration: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  artistId: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  albumId: string;
}
