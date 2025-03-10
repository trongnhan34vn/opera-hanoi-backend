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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_dto_1 = require("../dto/request/user.dto");
const common_1 = require("@nestjs/common");
const user_mapper_1 = require("../mapper/user.mapper");
const common_lib_1 = require("common-lib");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("../entity/user.entity");
const date_fns_1 = require("date-fns");
let UserService = class UserService {
    constructor(userRepository, userMapper, logger) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.logger = logger;
    }
    async findAll() {
        const users = await this.userRepository.findAll();
        const userDtos = [];
        users.forEach((user) => {
            const userDto = this.userMapper.toDto(user);
            userDtos.push(userDto);
        });
        return userDtos;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `User not found with id [${id}]`);
        }
        return this.userMapper.toDto(user);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `User not found with email [${email}]`);
        }
        return user;
    }
    async findByPhone(phone) {
        const user = await this.userRepository.findOne({ where: { phone } });
        if (!user) {
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `User not found with phone [${phone}]`);
        }
        return user;
    }
    async checkExistUserByPhone(phone) {
        try {
            const user = await this.findByPhone(phone);
            return !!user;
        }
        catch (error) {
            return false;
        }
    }
    async checkExistUserByEmail(email) {
        try {
            const user = await this.findByEmail(email);
            return !!user;
        }
        catch (error) {
            return false;
        }
    }
    async save(userDto) {
        try {
            if (!userDto.id) {
                this.logger.log('Execute create user...');
                const userEmailFound = await this.checkExistUserByEmail(userDto.email);
                const userPhoneFound = await this.checkExistUserByPhone(userDto.phone);
                const isUserExisted = userEmailFound || userPhoneFound;
                if (isUserExisted) {
                    throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.CONFLICT.getCode, common_lib_1.ErrorMessage.CONFLICT.getMessage, `User [${userDto.email}] is already existed`);
                }
                const newUser = this.userMapper.toEntity(userDto);
                const savedUser = await newUser.save();
                this.logger.log(`User saved [${savedUser.email}]`);
                return this.userMapper.toDto(savedUser);
            }
            this.logger.log('Execute update user...');
            const updateUser = await this.userRepository.findOne({
                where: { id: userDto.id },
            });
            if (!updateUser) {
                throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.NOT_FOUND.getCode, common_lib_1.ErrorMessage.NOT_FOUND.getMessage, `User [${userDto.email}] not found`);
            }
            const updatedUser = await updateUser.update({
                email: userDto.email,
                phone: userDto.phone,
                address: userDto.address,
                firstName: userDto.firstName,
                lastName: userDto.lastName,
                birthDate: userDto.birthDate
                    ? (0, date_fns_1.parse)(userDto.birthDate, 'yyyy/MM/dd', new Date())
                    : undefined,
                updatedAt: new Date(Date.now()),
            }, { where: { id: userDto.id } });
            this.logger.log(`User saved [${updatedUser.email}]`);
            return this.userMapper.toDto(updatedUser);
        }
        catch (error) {
            this.logger.error(error);
            if (error instanceof common_lib_1.ResourceException &&
                error.getErrorCode === common_lib_1.ErrorMessage.CONFLICT.getCode) {
                throw error;
            }
            throw new common_lib_1.ResourceException(common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getCode, common_lib_1.ErrorMessage.INTERNAL_SERVER_ERROR.getMessage, `User saved error [${userDto.email}]`);
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_lib_1.Log)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "save", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, user_mapper_1.UserMapper,
        common_lib_1.LoggerFactory])
], UserService);
//# sourceMappingURL=user.service.impl.js.map