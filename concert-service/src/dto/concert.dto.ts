import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class ConcertDto {
  // ID PRIMARY KEY
  @IsString()
  @IsOptional()
  id?: string;

  // title
  @IsString()
  title: string;

  // description
  @IsString()
  @IsOptional()
  description?: string;

  // art
  @IsString()
  @IsOptional()
  art?: string;

  // director
  @IsString()
  @IsOptional()
  director: string;

  // duration
  @IsInt()
  duration: number;

  // price
  @IsInt()
  price: number;

  // isActive
  @IsString()
  @IsOptional()
  isActive?: boolean;

  // Many to Many with Category
  // input: array of category id (string [])
  @IsArray()
  @ArrayNotEmpty()
  categories: string[];

  // 1 concert can show in many show time
  // input: array of show time id (string of datetime[]) pattern: yyyy/MM/dd HH:mm:ss
  @IsArray()
  @ArrayNotEmpty()
  showTimes: string[];
}
