import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Response } from 'express';
import { CartDto } from '../dto/request/cart.dto';
import { CartService } from '../service/impl/cart.service.impl';
import { CartItemDto } from '../dto/request/cart.item.dto';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { CartItemService } from '../service/impl/cart.item.service.impl';

@Controller('/api/v1/business/carts')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
    private readonly httpResponseFactory: HttpResponseFactory,
  ) {}

  @Post('/')
  @SkipAuth()
  async createCart(@Res() res: Response, @Body() cartDto: CartDto) {
    const cart = await this.cartService.create(cartDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      `New cart is created [${cart.id}]`,
      cart,
    );
  }

  @Post('/add-to-cart')
  @SkipAuth()
  async addToCart(@Res() res: Response, @Body() cartItemDto: CartItemDto) {
    const cartItem = await this.cartItemService.addToCart(cartItemDto);
    return this.httpResponseFactory.sendSuccessResponse(
      res,
      HttpStatus.CREATED,
      SuccessMessage.CREATED.getCode,
      `Added to cart [${cartItem.id}]`,
      cartItem,
    );
  }
}
