import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { CartDto } from 'src/dto/request/cart.dto';
import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { ICartItemService } from 'src/service/cart.item.service.interface';
import { ICartService } from 'src/service/cart.service.interface';
export declare class CartController {
    private readonly cartService;
    private readonly carItemService;
    private readonly responseFactory;
    constructor(cartService: ICartService, carItemService: ICartItemService, responseFactory: HttpResponseFactory);
    createCart(res: Response, cartDto: CartDto): Promise<Response<any, Record<string, any>>>;
    addToCart(res: Response, cartItemDto: CartItemDto): Promise<Response<any, Record<string, any>>>;
}
