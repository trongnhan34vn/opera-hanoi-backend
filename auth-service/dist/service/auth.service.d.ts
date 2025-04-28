import { KeycloakService } from './keycloak.service';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { AccountService } from './account.service';
import { CartService } from './cart.service';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
export declare class AuthService {
    private readonly keycloakService;
    private readonly logger;
    private readonly accountService;
    private readonly cartService;
    constructor(keycloakService: KeycloakService, logger: LoggerFactory, accountService: AccountService, cartService: CartService);
    signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    signInAdmin(userLogin: UserSignInDto): Promise<KeycloakTokenResponse>;
    signUp(userSignUp: UserSignUpDto): Promise<boolean>;
}
