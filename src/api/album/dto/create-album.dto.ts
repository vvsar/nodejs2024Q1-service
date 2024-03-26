import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  artistId: string | null;
}
