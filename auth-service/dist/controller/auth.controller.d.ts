import { HttpResponseFactory } from 'common-lib';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
export declare class AuthController {
    private readonly responseFactory;
    private readonly authService;
    constructor(responseFactory: HttpResponseFactory, authService: AuthService);
    signIn(res: Response, userSignInDto: UserSignInDto): Promise<Response<any, Record<string, any>>>;
    signUp(res: Response, userDto: UserSignUpDto): Promise<Response<any, Record<string, any>>>;
    signInAdmin(res: Response, userDto: UserSignInDto): Promise<Response<any, Record<string, any>>>;
}
