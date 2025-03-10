import { UserDto } from '../dto/request/user.dto';
import { UserService } from '../service/user.service.impl';
import { HttpResponseFactory } from 'common-lib';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly responseFactory;
    constructor(userService: UserService, responseFactory: HttpResponseFactory);
    createUser(res: Response, userDto: UserDto): Promise<Response<any, Record<string, any>>>;
}
