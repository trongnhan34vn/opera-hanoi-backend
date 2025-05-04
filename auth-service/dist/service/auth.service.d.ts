import { IS3Service } from 'common';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { AccountService } from './account.service';
import { CartService } from './cart.service';
import { KeycloakService } from './keycloak.service';
export declare class AuthService {
    private readonly keycloakService;
    private readonly logger;
    private readonly accountService;
    private readonly cartService;
    private readonly s3Service;
    constructor(keycloakService: KeycloakService, logger: LoggerFactory, accountService: AccountService, cartService: CartService, s3Service: IS3Service);
    signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    createAdminAccount(accountDto: UserSignUpDto): Promise<boolean>;
    private createMulterFileFromPath;
    signInAdmin(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    signUp(userSignUp: UserSignUpDto): Promise<boolean>;
}
