import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID('4')
  artistId: string;
}
