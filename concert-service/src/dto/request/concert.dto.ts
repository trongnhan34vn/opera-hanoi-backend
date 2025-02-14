import { IsArray, IsOptional, IsString } from 'class-validator';
import { ShowtimeDto } from './showtime.dto';

type SeatCategoriesPrice = {
  seatCategoryId: string;
  price: number;
};

export class ConcertDto {
  // PK ID
  @IsString()
  @IsOptional()
  id: string;

  // ART
  @IsString()
  art: string;

  // DIRECTOR
  @IsString()
  director: string;

  // TITLE
  @IsString()
  title: string;

  // DESCRIPTION
  @IsString()
  description: string;

  // RELATIONS //
  // N CONCERT - N CATEGORIES list of ids
  @IsArray()
  categories: string[];

  // 1 CONCERT - N IMAGES list of url
  @IsArray()
  images: string[];
  //
  // 1 CONCERT - N SHOW TIME list of date pattern [yyyy/MM/dd HH:mm:ss]
  @IsArray()
  showTimes: ShowtimeDto[];

  @IsArray()
  seatCategoriesPrice: SeatCategoriesPrice[];
  // RELATIONS //
}
