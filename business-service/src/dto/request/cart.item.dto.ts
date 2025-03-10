import { IsOptional, IsString } from 'class-validator';

export class CartItemDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  cartId: string;

  @IsString()
  seatId: string;

  @IsString()
  concertId: string;

  @IsString()
  @IsOptional()
  price: number;
}
