import { IsOptional, IsString } from 'class-validator';

export class ShowtimeDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
