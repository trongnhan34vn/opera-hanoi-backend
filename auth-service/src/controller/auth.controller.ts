import { Body, Controller, Post, Res } from '@nestjs/common';
import { HttpResponseFactory } from 'common';
import { Response } from 'express';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { AuthService } from '../service/auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly responseFactory: HttpResponseFactory,
    private readonly authService: AuthService,
  ) {}

  @Post('/sign-in')
  @SkipAuth()
  async signIn(@Res() res: Response, @Body() userSignInDto: UserSignInDto) {
    const response = await this.authService.signIn(userSignInDto);
    return this.responseFactory.sendOKResponse(
      res,
      'Sign In successfully',
      response,
    );
  }

  @Post('/sign-up')
  @SkipAuth()
  async signUp(@Res() res: Response, @Body() userDto: UserSignUpDto) {
    const response = await this.authService.signUp(userDto);
    return this.responseFactory.sendOKResponse(
      res,
      'Sign Up successfully',
      response,
    );
  }

  @Post('/sign-in-admin')
  @SkipAuth()
  async signInAdmin(@Res() res: Response, @Body() userDto: UserSignInDto) {
    const response = await this.authService.signInAdmin(userDto);
    return this.responseFactory.sendOKResponse(
      res,
      'Sign in successfully',
      response,
    );
  }
}
