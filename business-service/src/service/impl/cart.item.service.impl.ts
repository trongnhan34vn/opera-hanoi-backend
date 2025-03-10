import { Injectable } from '@nestjs/common';
import { ErrorMessage, LoggerFactory, ResourceException } from 'common-lib';
import { CartItemRepository } from '../../repository/impl/cart.item.repository.impl';
import { CartItemServiceInterface } from '../cart.item.service.interface';
import { CartItem } from 'src/entity/cart.item.entity';
import { CartItemDto } from '../../dto/request/cart.item.dto';
import { CartItemMapper } from '../../mapper/impl/cart.item.mapper.impl';
import { Sequelize } from 'sequelize-typescript';
import { ConcertSeat } from '../../entity/sub/concert.seat.sub.entity';
import { SeatStatusName } from '../../entity/enum/seat.status.enum';
import * as moment from 'moment-timezone';

@Injectable()
export class CartItemService implements CartItemServiceInterface {
  constructor(
    private readonly logger: LoggerFactory,
    private readonly cartItemMapper: CartItemMapper,
    private readonly cartItemRepository: CartItemRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async addToCart(dto: CartItemDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const cartItem = this.cartItemMapper.toEntity(dto);
      // no price -> set price
      const seatId = dto.seatId;
      const concertSeat = await ConcertSeat.findOne({
        where: { seatId: seatId },
      });

      // seat not found on sub table
      if (!concertSeat) {
        this.logger.error('Seat not found');
        throw new ResourceException(
          ErrorMessage.NOT_FOUND.getCode,
          ErrorMessage.NOT_FOUND.getMessage,
          `ConcertSeat not found with id [${seatId}]`,
        );
      }

      // seat is reserved
      if (concertSeat.status === SeatStatusName.RESERVED) {
        this.logger.error('Seat is RESERVED');
        throw new ResourceException(
          ErrorMessage.CONFLICT.getCode,
          ErrorMessage.CONFLICT.getMessage,
          'Seat is RESERVED',
        );
      }
      cartItem.price = concertSeat.price;

      // create
      const createdCartItem = await this.cartItemRepository.create(
        cartItem,
        transaction,
      );
      this.logger.log(`Cart created [${createdCartItem.id}]`);

      // set seat of concert status
      await concertSeat.update({
        status: SeatStatusName.RESERVED,
        updatedAt: moment(new Date(Date.now())).tz('Asia/Ho_Chi_Minh').toDate(),
      });

      this.logger.log("Set status of concert 'seat");

      await transaction.commit();
      return this.cartItemMapper.toDto(createdCartItem);
    } catch (error) {
      await transaction.rollback();
      this.logger.error(error);
      throw error;
    }
  }

  save(dto: CartItem): Promise<CartItem> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<CartItem[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<CartItem> {
    throw new Error('Method not implemented.');
  }

  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
