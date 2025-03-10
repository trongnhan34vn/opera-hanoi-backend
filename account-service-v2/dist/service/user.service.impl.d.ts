import { UserDto } from 'src/dto/request/user.dto';
import { IUserService } from '../interface/user.interface';
import { UserMapper } from '../mapper/user.mapper';
import { LoggerFactory } from 'common-lib';
import { User } from '../entity/user.entity';
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly userMapper;
    private readonly logger;
    constructor(userRepository: typeof User, userMapper: UserMapper, logger: LoggerFactory);
    delete: (id: string) => Promise<void>;
    findAll(): Promise<UserDto[]>;
    findById(id: string): Promise<UserDto>;
    findByEmail(email: string): Promise<User>;
    findByPhone(phone: string): Promise<User>;
    checkExistUserByPhone(phone: string): Promise<boolean>;
    checkExistUserByEmail(email: string): Promise<boolean>;
    save(userDto: UserDto): Promise<UserDto>;
}
