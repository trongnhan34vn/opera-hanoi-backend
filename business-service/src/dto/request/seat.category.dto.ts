import { IsOptional, IsString } from 'class-validator';

export class SeatCategoryDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string;
}
