import { IsOptional, IsString } from 'class-validator';

export class CategoryDto {
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
