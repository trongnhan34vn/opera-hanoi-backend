import { UserDto } from 'src/dto/request/user.dto';
import { User } from 'src/entity/user.entity';
import { IUserMapper } from '../interface/user.interface';
export declare class UserMapper implements IUserMapper {
    toDto(user: User): UserDto;
    toEntity(userDto: UserDto): User;
}
