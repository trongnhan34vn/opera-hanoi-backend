"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_dto_1 = require("../dto/request/user.dto");
const user_entity_1 = require("../entity/user.entity");
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const uuid_1 = require("uuid");
let UserMapper = class UserMapper {
    toDto(user) {
        const userDto = new user_dto_1.UserDto();
        userDto.id = user.id;
        userDto.email = user.email;
        userDto.phone = user.phone;
        if (user.address) {
            userDto.address = user.address;
        }
        if (user.birthDate) {
            userDto.birthDate = user.birthDate.toDateString();
        }
        userDto.firstName = user.firstName;
        userDto.lastName = user.lastName;
        return userDto;
    }
    toEntity(userDto) {
        const user = new user_entity_1.User();
        const uuid = (0, uuid_1.v4)();
        user.set('id', userDto.id ? userDto.id : uuid);
        user.set('email', userDto.email);
        user.set('phone', userDto.phone);
        if (userDto.address) {
            user.set('address', userDto.address);
        }
        user.set('firstName', userDto.firstName);
        user.set('lastName', userDto.lastName);
        if (userDto.birthDate) {
            user.set('birthDate', (0, date_fns_1.parse)(userDto.birthDate, 'yyyy/MM/dd', new Date()));
        }
        return user;
    }
};
exports.UserMapper = UserMapper;
exports.UserMapper = UserMapper = __decorate([
    (0, common_1.Injectable)()
], UserMapper);
//# sourceMappingURL=user.mapper.js.map