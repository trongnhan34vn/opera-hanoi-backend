import { GenericRepository, GenericService } from './generic.interface';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/request/user.dto';

export interface IUserRepository extends GenericRepository<User> {}
export interface IUserService extends GenericService<UserDto> {}