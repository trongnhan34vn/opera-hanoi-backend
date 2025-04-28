import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class Pagination {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional({ description: 'Page number' })
  page?: number = 0;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @ApiPropertyOptional({ description: 'Number of object in page' })
  size?: number = 10;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Field used for sorting' })
  sortBy?: string = 'id';

  @IsOptional()
  @ApiPropertyOptional({ description: 'Ascending or Descending Order' })
  orderBy: 'ASC' | 'DESC' = 'ASC';
}
