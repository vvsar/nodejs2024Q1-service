import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID('4')
  artistId: string;
}
