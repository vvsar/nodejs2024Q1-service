import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateTrackDto {
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
