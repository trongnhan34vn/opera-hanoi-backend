import {
  GenericMapper,
  GenericService,
} from './generic.interface';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/request/user.dto';

export interface IUserService extends GenericService<UserDto> {}
export interface IUserMapper extends GenericMapper<User, UserDto> {}
