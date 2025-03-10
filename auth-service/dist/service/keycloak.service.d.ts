import { HttpServiceFactory, LoggerFactory } from 'common-lib';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
export declare class KeycloakService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpServiceFactory, logger: LoggerFactory);
    signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    signUp(userSignUp: UserSignUpDto): Promise<boolean>;
    signUpTransaction(user: UserSignUpDto): Promise<void>;
    private deleteUser;
    private createUser;
    private mappingRoleToUser;
    private assignRoleToUser;
    private findUserByEmail;
    private findRoleByName;
    private getAdminAccess;
}
