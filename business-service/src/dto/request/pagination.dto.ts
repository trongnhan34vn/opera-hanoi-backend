import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  size?: number = 10;

  @IsOptional()
  sortBy?: string = 'id';

  @IsOptional()
  orderBy: 'ASC' | 'DESC' = 'ASC';
}
