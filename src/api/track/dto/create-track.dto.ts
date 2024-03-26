import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  duration: number;

  artistId: string | null;

  albumId: string | null;
}
