import { IsOptional, IsString } from 'class-validator';

export class GenreDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  code: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
