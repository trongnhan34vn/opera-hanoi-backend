import { UserDto } from 'src/dto/request/user.dto';
import { User } from 'src/entity/user.entity';
import { IUserMapper } from '../interface/user.interface';
import { Injectable } from '@nestjs/common';
import { parse } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserMapper implements IUserMapper {
  toDto(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.phone = user.phone;
    if (user.address) {
      userDto.address = user.address;
    }
    if (user.birthDate) {
      userDto.birthDate = user.birthDate?.toDateString();
    }
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    return userDto;
  }

  toEntity(userDto: UserDto): User {
    const user = new User();
    const uuid = uuidv4();
    user.set('id', userDto.id ? userDto.id : uuid);
    user.set('email', userDto.email);
    user.set('phone', userDto.phone);
    if (userDto.address) {
      user.set('address', userDto.address);
    }
    user.set('firstName', userDto.firstName);
    user.set('lastName', userDto.lastName);
    if (userDto.birthDate) {
      user.set('birthDate', parse(userDto.birthDate, 'yyyy/MM/dd', new Date()));
    }
    return user;
  }
}
