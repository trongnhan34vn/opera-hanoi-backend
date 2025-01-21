import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Request, Response } from 'express';
import { UserSignIn, UserSignUp } from '../interface/user.interface';
import { AuthService } from '../service/auth.service';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly responseFactory: HttpResponseFactory,
    private readonly authService: AuthService,
  ) {
  }

  @Post('/sign-in')
  @SkipAuth()
  async signIn(@Res() res: Response, @Req() req: Request) {
    const userLogin: UserSignIn = req.body;
    const response = await this.authService.signIn(userLogin);
    return this.responseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Sign In successfully',
      response,
    );
  }

  @Post('/sign-up')
  @SkipAuth()
  async signUp(@Res() res: Response, @Req() req: Request) {
    const userLogin: UserSignUp = req.body;
    const response = await this.authService.signUp(userLogin);
    return this.responseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Sign Up successfully',
      response,
    );
  }
}
