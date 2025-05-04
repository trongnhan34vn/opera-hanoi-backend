import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { HttpResponseFactory, SkipAuth } from 'common';
import { Response } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { ICartItemServiceToken, ICartServiceToken } from 'src/constants/symbol';
import { CartDto } from 'src/dto/request/cart.dto';
import { CartItemDto } from 'src/dto/request/cart.item.dto';
import { KeycloakRoleEnum } from 'src/enum/keycloak.role.enum';
import { ICartItemService } from 'src/service/cart.item.service.interface';
import { ICartService } from 'src/service/cart.service.interface';

@Controller('/api/v1/business/carts')
export class CartController {
  constructor(
    @Inject(ICartServiceToken)
    private readonly cartService: ICartService,
    @Inject(ICartItemServiceToken)
    private readonly carItemService: ICartItemService,
    private readonly responseFactory: HttpResponseFactory,
  ) {}

  @Post()
  @SkipAuth()
  async createCart(@Res() res: Response, @Body() cartDto: CartDto) {
    const cart = await this.cartService.save(cartDto);
    return this.responseFactory.sendCreatedResponse(
      res,
      `Cart [${cart.id}] is created`,
      cart,
    );
  }

  @Post('/add-to-cart')
  @Roles({roles: [
    KeycloakRoleEnum.CUSTOMER_ROLE
  ]})
  async addToCart(@Res() res: Response, @Body() cartItemDto: CartItemDto) {
    const createdCartItem = await this.carItemService.save(cartItemDto);
    return this.responseFactory.sendCreatedResponse(
      res,
      `Cart Item [${createdCartItem.id}] is created`,
      createdCartItem,
    );
  }
}
