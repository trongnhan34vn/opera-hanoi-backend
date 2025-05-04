import { Inject, Injectable } from '@nestjs/common';
import {
  ConflictException,
  HttpErrorCode,
  InternalServerException,
  Log,
  LoggerFactory,
  NotFoundException,
  ResourceException,
} from 'common';
import { parse } from 'date-fns';
import { IUserMapperToken, IUserRepositoryToken } from 'src/constants/symbol';
import { UserDto } from 'src/dto/request/user.dto';
import { User } from 'src/entity/user.entity';
import { IUserMapper } from 'src/mapper/user.mapper.interface';
import { IUserRepository } from 'src/repository/user.repository.interface';
import { IUserService } from '../user.service.interface';

@Injectable()
export class UserServiceImpl implements IUserService {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
    @Inject(IUserMapperToken)
    private readonly userMapper: IUserMapper,
    private readonly logger: LoggerFactory,
  ) {}

  async delete(id: string) {
    try {
      await this.userRepository.remove(id);
    } catch (error) {
      throw error;
    }
  }

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
    const user = await this.userRepository.findById(id);
    // check existed
    if (!user) {
      throw new NotFoundException(`User not found with id [${id}]`);
    }
    return this.userMapper.toDto(user);
  }

  /**
   * find user by email
   * @param email
   * @return user
   */
  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    // check existed
    if (!user) {
      throw new NotFoundException(`User not found with email [${email}]`);
    }
    return this.userMapper.toDto(user);
  }

  /**
   * find user by phone
   * @param phone
   * @return user
   */
  async findByPhone(phone: string): Promise<UserDto> {
    const user = await this.userRepository.findByPhone(phone);
    // check existed
    if (!user) {
      throw new NotFoundException(`User not found with phone [${phone}]`);
    }
    return this.userMapper.toDto(user);
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
          throw new ConflictException(
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
      const updateUser = await this.userRepository.findById(userDto.id);
      if (!updateUser) {
        throw new NotFoundException(`User [${userDto.email}] not found`);
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
        error.errorCode === HttpErrorCode.CONFLICT
      ) {
        throw error;
      }

      throw new InternalServerException(`User saved error [${userDto.email}]`);
    }
  }
}
