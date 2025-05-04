import { UserDto } from 'src/dto/request/user.dto';
import { GenericService } from './generic.service.interface';

export interface IUserService extends GenericService<UserDto> {
  findByEmail(email: string): Promise<UserDto>;
  findByPhone(phone: string): Promise<UserDto>;
}
