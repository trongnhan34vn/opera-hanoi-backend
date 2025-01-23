import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { HttpResponseFactory, SuccessMessage } from 'common-lib';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly responseFactory: HttpResponseFactory,
    private readonly authService: AuthService,
  ) {
  }

  @Post('/sign-in')
  @SkipAuth()
  async signIn(@Res() res: Response, @Body() userSignInDto: UserSignInDto) {
    const response = await this.authService.signIn(userSignInDto);
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
  async signUp(@Res() res: Response, @Body() userDto: UserSignUpDto) {
    const response = await this.authService.signUp(userDto);
    return this.responseFactory.sendSuccessResponse(
      res,
      HttpStatus.OK,
      SuccessMessage.OK.getCode,
      'Sign Up successfully',
      response,
    );
  }
}
