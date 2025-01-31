import { IsOptional, IsString } from 'class-validator';

export class ShowTimeDto {
  // ID PRIMARY KEY
  @IsString()
  id?: string;

  // show day
  @IsString()
  dateTime: string;

  // 1 concert for 1 day =>
  // 1 show time - 1 concert && 1 concert - n show_time
  @IsString()
  concertId: string;

  // 1 show time has many seat
  @IsOptional()
  seats?: string[];
}