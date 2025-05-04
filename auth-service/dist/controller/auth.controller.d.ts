import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { AuthService } from '../service/auth.service';
import { KeycloakService } from 'src/service/keycloak.service';
export declare class AuthController {
    private readonly responseFactory;
    private readonly authService;
    private readonly keycloakService;
    constructor(responseFactory: HttpResponseFactory, authService: AuthService, keycloakService: KeycloakService);
    signIn(res: Response, userSignInDto: UserSignInDto): Promise<Response<any, Record<string, any>>>;
    signUp(res: Response, userDto: UserSignUpDto): Promise<Response<any, Record<string, any>>>;
    signInAdmin(res: Response, userDto: UserSignInDto): Promise<Response<any, Record<string, any>>>;
    findAllRoles(res: Response): Promise<Response<any, Record<string, any>>>;
    createAdminAccount(res: Response, adminAccountDto: UserSignUpDto): Promise<Response<any, Record<string, any>>>;
}
