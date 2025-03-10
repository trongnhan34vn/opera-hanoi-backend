import { HttpResponseFactory } from 'common-lib';
import { Response } from 'express';
import { CartDto } from '../dto/request/cart.dto';
import { CartService } from '../service/impl/cart.service.impl';
import { CartItemDto } from '../dto/request/cart.item.dto';
import { CartItemService } from '../service/impl/cart.item.service.impl';
export declare class CartController {
    private readonly cartService;
    private readonly cartItemService;
    private readonly httpResponseFactory;
    constructor(cartService: CartService, cartItemService: CartItemService, httpResponseFactory: HttpResponseFactory);
    createCart(res: Response, cartDto: CartDto): Promise<Response<any, Record<string, any>>>;
    addToCart(res: Response, cartItemDto: CartItemDto): Promise<Response<any, Record<string, any>>>;
}
