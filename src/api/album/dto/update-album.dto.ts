import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  artistId: string;
}
