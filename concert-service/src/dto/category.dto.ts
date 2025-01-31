import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDto {
  // ID PRIMARY KEY
  @IsOptional()
  @IsString()
  id?: string;

  // title
  @IsString()
  @IsNotEmpty()
  title: string;

  // description
  @IsOptional()
  @IsString()
  description?: string;

  // Many to Many with Concert
}
