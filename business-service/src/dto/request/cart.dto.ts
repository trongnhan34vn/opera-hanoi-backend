import { IsArray, IsOptional, IsString } from 'class-validator';
import { CartItemDto } from './cart.item.dto';

export class CartDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  userId: string;

  @IsArray()
  @IsOptional()
  cartItems: CartItemDto[];
}
