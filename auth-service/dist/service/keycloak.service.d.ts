import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserKc } from '../dto/response/UserKc.dto';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { HttpServiceFactory } from 'common/dist/factory/impl/http.service.factory.impl';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
export declare class KeycloakService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpServiceFactory, logger: LoggerFactory);
    signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    signUp(userSignUp: UserSignUpDto): Promise<UserKc>;
    signUpTransaction(user: UserSignUpDto): Promise<void>;
    private deleteUser;
    private createUser;
    private mappingRoleToUser;
    findAllRoles(token: string): Promise<any>;
    private assignRoleToUser;
    private findUserByEmail;
    private findMyClient;
    private findRoleByName;
    getAdminAccess(): Promise<string>;
}
