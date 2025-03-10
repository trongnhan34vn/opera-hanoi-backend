"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const common_lib_1 = require("common-lib");
const cart_item_repository_impl_1 = require("../../repository/impl/cart.item.repository.impl");
const cart_item_mapper_impl_1 = require("../../mapper/impl/cart.item.mapper.impl");
const sequelize_typescript_1 = require("sequelize-typescript");
const concert_seat_sub_entity_1 = require("../../entity/sub/concert.seat.sub.entity");
const seat_status_enum_1 = require("../../entity/enum/seat.status.enum");
const moment = require("moment-timezone");
let CartItemService = class CartItemService {
    constructor(logger, cartItemMapper, cartItemRepository, sequelize) {
        this.logger = logger;
        this.cartItemMapper = cartItemMapper;
        this.cartItemRepository = cartItemRepository;
        this.sequelize = sequelize;
    }
    async addToCart(dto) {
        const transaction = await this.sequelize.transaction();
        try {
            const cartItem = this.cartItemMapper.toEntity(dto);
            const seatId = dto.seatId;
            const concertSeat = await concert_seat_sub_entity_1.ConcertSeat.findOne({
                where: { seatId: seatId },
            });
            if (!concertSeat) {
                this.logger.error('Seat not found');
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `ConcertSeat not found with id [${seatId}]`);
            }
            if (concertSeat.status === seat_status_enum_1.SeatStatusName.RESERVED) {
                this.logger.error('Seat is RESERVED');
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.CONFLICT.getCode, common_lib_1.ErrorMessage.CONFLICT.getMessage, 'Seat is RESERVED');
            }
            cartItem.price = concertSeat.price;
            const createdCartItem = await this.cartItemRepository.create(cartItem, transaction);
            this.logger.log(`Cart created [${createdCartItem.id}]`);
            await concertSeat.update({
                status: seat_status_enum_1.SeatStatusName.RESERVED,
                updatedAt: moment(new Date(Date.now())).tz('Asia/Ho_Chi_Minh').toDate(),
            });
            this.logger.log("Set status of concert 'seat");
            await transaction.commit();
            return this.cartItemMapper.toDto(createdCartItem);
        }
        catch (error) {
            await transaction.rollback();
            this.logger.error(error);
            throw error;
        }
    }
    save(dto) {
        throw new Error('Method not implemented.');
    }
    findAll() {
        throw new Error('Method not implemented.');
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        throw new Error('Method not implemented.');
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_lib_1.LoggerFactory,
        cart_item_mapper_impl_1.CartItemMapper,
        cart_item_repository_impl_1.CartItemRepository,
        sequelize_typescript_1.Sequelize])
], CartItemService);
//# sourceMappingURL=cart.item.service.impl.js.map