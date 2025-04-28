import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ShowtimeDto } from './showtime.dto';

export class ConcertDto {
  // PK ID
  @IsString()
  @IsOptional()
  id: string;

  // CODE
  @IsString()
  @IsOptional()
  code: string;

  // ART
  @IsArray()
  @ApiProperty({ example: ['Anh Duy Tồ'], description: 'Artist' })
  artists: string[];

  // DIRECTOR
  @IsArray()
  @ApiProperty({ example: ['Anh Duy Tồ'], description: 'Director' })
  directors: string[];

  // TITLE
  @IsString()
  @ApiProperty({ example: 'Anh Duy Tồ', description: 'Title' })
  title: string;

  // DESCRIPTION
  @IsString()
  @ApiProperty({
    example: 'Đây là chương trình của anh Duy tồ',
    description: 'description',
  })
  description: string;

  // RELATIONS //
  // N CONCERT - N CATEGORIES list of ids
  @IsArray()
  @ApiProperty({
    example: ['7965d8fe-a144-47e7-90d9-e78cd7a54c1c', '38767a6d-fad6-4beb-ac0d-0a79e67ff428'],
    description: 'genres',
  })
  genres: string[];

  // 1 CONCERT - N IMAGES list of url
  @IsArray()
  @ApiProperty({ example: 'đây là ảnh', description: 'images' })
  images: string[];
  //
  // 1 CONCERT - N SHOW TIME list of date pattern [yyyy/MM/dd HH:mm:ss]
  @IsArray()
  @ApiProperty({
    example: [
      { startTime: '2025/04/14 12:00:00', endTime: '2025/04/14 14:00:00' },
    ],
    description: 'show time',
  })
  showTimes: ShowtimeDto[];
  // RELATIONS //

  @IsArray()
  @ApiProperty({
    example: [
      {
        seatCategoryId: '40a7b912-b9f3-43a3-a29a-07d6cd4ccdf1',
        priceValue: 1000000,
      },
      {
        seatCategoryId: '91d0db14-5aa9-4f96-b6e1-ac4c22942982',
        priceValue: 800000,
      },
      {
        seatCategoryId: '85bf58d1-8175-48a0-93a7-b25da7a2b66d',
        priceValue: 700000,
      },
      {
        seatCategoryId: '9bb22ffd-de50-4e86-b24b-cd17509566d3',
        priceValue: 500000,
      },
      {
        seatCategoryId: '70edc5c8-4c12-48b9-b72b-95dd63c6c184',
        priceValue: 200000,
      },
    ],
    description: 'prices',
  })
  prices: PriceDto[];
}

export type PriceDto = {
  seatCategoryId: string;
  price: number;
};
