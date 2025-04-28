import { Injectable } from "@nestjs/common";
import { ICartItemMapper } from "../cart.item.mapper.interface";
import { CartItemDto } from "src/dto/request/cart.item.dto";
import { CartItem } from "src/entity/cart.item.entity";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CartItemMapper implements ICartItemMapper {
    toDto(entity: CartItem): CartItemDto {
        const cartItemDto = new CartItemDto();
        cartItemDto.id = entity.id;
        cartItemDto.price = entity.price;
        cartItemDto.concertSeatId = entity.concertSeatId;
        cartItemDto.cartId = entity.cartId;
        return cartItemDto;
    }
    
    toEntity(dto: CartItemDto): CartItem {
        const cartItem = new CartItem();
        cartItem.id = dto.id ? dto.id : uuidv4();
        cartItem.cartId = dto.cartId;
        cartItem.price = dto.price;
        cartItem.concertSeatId = dto.concertSeatId;
        return cartItem;
    }

    toDtos(entities: CartItem[]): CartItemDto[] {
        const cartItemDtos: CartItemDto[] = [];
        for (const entity of entities) {
            const cartItemDto = this.toDto(entity);
            cartItemDtos.push(cartItemDto);
        }
        return cartItemDtos;
    }
    toEntities(dtos: CartItemDto[]): CartItem[] {
        const cartItems: CartItem[] = [];
        for (const dto of dtos) {
            const cartItem = this.toEntity(dto);
            cartItems.push(cartItem);
        }
        return cartItems;
    }

}