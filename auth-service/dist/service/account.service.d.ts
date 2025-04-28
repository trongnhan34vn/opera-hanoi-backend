import { AccountServiceUser } from '../dto/request/UserSignUp.dto';
import { HttpServiceFactory } from 'common/dist/factory/impl/http.service.factory.impl';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
export declare class AccountService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpServiceFactory, logger: LoggerFactory);
    save(userDto: AccountServiceUser): Promise<any>;
}
