import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpServiceFactory, LoggerFactory } from 'common';
import {
  HttpHeaders
} from 'common/dist/factory/http.service.factory.interface';
import {
  API_KEY,
  BUSINESS_SERVICE_BASEURL,
  BUSINESS_SERVICE_CREATE_CART_ENDPOINT,
  BUSINESS_SERVICE_PATH,
} from '../constants/ServiceConstant';

@Injectable()
export class CartService {
  constructor(
    private readonly httpService: HttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  async createCart(userId: string) {
    try {
      this.logger.log(`Start create cart for user [${userId}]`);
      const cart = {
        userId,
      };
      const headers: HttpHeaders = {
        apiKey: API_KEY,
      };

      const response = await this.httpService.post(
        BUSINESS_SERVICE_BASEURL,
        BUSINESS_SERVICE_PATH + BUSINESS_SERVICE_CREATE_CART_ENDPOINT,
        headers,
        cart
      )

      if (!response) {
        throw new InternalServerErrorException(
          'Error occurred when creating cart for user',
        );
      }
      this.logger.log('Cart created');
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
