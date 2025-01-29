import { UserDto } from 'src/dto/request/user.dto';
import { IUserService } from '../interface/user.interface';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mapper/user.mapper';
import {
  ErrorMessage,
  Log,
  LoggerFactory,
  ResourceException,
} from 'common-lib';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entity/user.entity';
import { parse } from 'date-fns';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly userMapper: UserMapper,
    private readonly logger: LoggerFactory,
  ) {}

  delete: (id: string) => Promise<void>;

  /**
   * find all user in database
   * @return user[]
   */
  async findAll() {
    const users: User[] = await this.userRepository.findAll();
    const userDtos: UserDto[] = [];
    users.forEach((user) => {
      const userDto = this.userMapper.toDto(user);
      userDtos.push(userDto);
    });
    return userDtos;
  }

  /**
   * find user by ID
   * @param id
   * @return user
   */
  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    // check existed
    if (!user) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `User not found with id [${id}]`,
      );
    }
    return this.userMapper.toDto(user);
  }

  /**
   * find user by email
   * @param email
   * @return user
   */
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    // check existed
    if (!user) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `User not found with email [${email}]`,
      );
    }
    return user;
  }

  /**
   * find user by phone
   * @param phone
   * @return user
   */
  async findByPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });
    // check existed
    if (!user) {
      throw new ResourceException(
        ErrorMessage.NOT_FOUND.getCode,
        ErrorMessage.NOT_FOUND.getMessage,
        `User not found with phone [${phone}]`,
      );
    }
    return user;
  }

  /**
   * check existed user by phone
   * @param phone
   * @return boolean
   */
  async checkExistUserByPhone(phone: string) {
    try {
      const user = await this.findByPhone(phone);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /**
   * check existed user by email
   * @param email
   * @return boolean
   */
  async checkExistUserByEmail(email: string) {
    try {
      const user = await this.findByEmail(email);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  /**
   * save user to database
   * @param userDto
   * @return createdUser
   */
  @Log()
  async save(userDto: UserDto) {
    try {
      // id == null || undefined => create
      if (!userDto.id) {
        // CREATE USER //
        this.logger.log('Execute create user...');

        // check user existed with phone or email
        const userEmailFound = await this.checkExistUserByEmail(userDto.email);
        const userPhoneFound = await this.checkExistUserByPhone(userDto.phone);
        const isUserExisted = userEmailFound || userPhoneFound;

        if (isUserExisted) {
          throw new ResourceException(
            ErrorMessage.CONFLICT.getCode,
            ErrorMessage.CONFLICT.getMessage,
            `User [${userDto.email}] is already existed`,
          );
        }

        const newUser = this.userMapper.toEntity(userDto);
        const savedUser = await newUser.save();
        this.logger.log(`User saved [${savedUser.email}]`);
        return this.userMapper.toDto(savedUser);
        // CREATE USER //
      }

      // UPDATE USER //
      this.logger.log('Execute update user...');
      const updateUser = await this.userRepository.findOne({
        where: { id: userDto.id },
      });
      if (!updateUser) {
        throw new ResourceException(
          ErrorMessage.NOT_FOUND.getCode,
          ErrorMessage.NOT_FOUND.getMessage,
          `User [${userDto.email}] not found`,
        );
      }
      const updatedUser = await updateUser.update(
        {
          email: userDto.email,
          phone: userDto.phone,
          address: userDto.address,
          firstName: userDto.firstName,
          lastName: userDto.lastName,
          birthDate: userDto.birthDate
            ? parse(
                userDto.birthDate, // Format ngày hiện tại theo 'yyyy/MM/dd'
                'yyyy/MM/dd',
                new Date(),
              )
            : undefined,
          updatedAt: new Date(Date.now()),
        },
        { where: { id: userDto.id } },
      );
      this.logger.log(`User saved [${updatedUser.email}]`);
      return this.userMapper.toDto(updatedUser);
      // UPDATE USER //
    } catch (error) {
      this.logger.error(error);
      // case conflict
      if (
        error instanceof ResourceException &&
        error.getErrorCode === ErrorMessage.CONFLICT.getCode
      ) {
        throw error;
      }

      throw new ResourceException(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
        ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
        `User saved error [${userDto.email}]`,
      );
    }
  }
}
