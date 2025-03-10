import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { HttpServiceFactory, LoggerFactory } from 'common-lib';
export declare class AccountService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpServiceFactory, logger: LoggerFactory);
    save(userDto: UserSignUpDto): Promise<string>;
}
