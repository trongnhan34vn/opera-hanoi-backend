import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import {
  ForbiddenException,
  HttpResponseFactory,
  KeycloakRoleEnum,
  SkipAuth,
} from 'common';
import { Request, Response } from 'express';
import { Roles } from 'nest-keycloak-connect';
import { RoleKC } from 'src/dto/response/RoleKC.dto';
import { KeycloakService } from 'src/service/keycloak.service';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { AuthService } from '../service/auth.service';
import { ChangePasswordDto } from 'src/dto/request/change.password.dto';
import { getEmailFromAccessToken } from 'src/uttil/utils';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly responseFactory: HttpResponseFactory,
    private readonly authService: AuthService,
    private readonly keycloakService: KeycloakService,
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

  @Get('/roles')
  @SkipAuth()
  async findAllRoles(@Res() res: Response) {
    const token = await this.keycloakService.getAdminAccess();
    const myClient = await this.keycloakService.findMyClient(token);
    const roles: RoleKC[] = await this.keycloakService.findAllRoles(
      token,
      myClient,
    );
    const stringRoles: string[] = [];
    for (const role of roles) {
      if (role.name.includes('uma')) continue;
      stringRoles.push(role.name);
    }
    return this.responseFactory.sendOKResponse(
      res,
      'Roles are founded',
      stringRoles,
    );
  }

  @Post('/users')
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_ADMIN_ACCOUNT_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.PUT_ADMIN_ACCOUNT_ROLE,
    ],
  })
  async createAdminAccount(
    @Res() res: Response,
    @Body() adminAccountDto: UserSignUpDto,
  ) {
    const created = await this.authService.createAdminAccount(adminAccountDto);
    return this.responseFactory.sendCreatedResponse(
      res,
      'User created',
      created,
    );
  }

  @Post('/users/:email/change-password')
  @Roles({
    roles: [KeycloakRoleEnum.CHANGE_SELF_PASSWORD_ROLE],
  })
  async changePassword(
    @Res() res: Response,
    @Req() req: Request,
    @Body() changePasswordDto: ChangePasswordDto,
    @Param('email') email: string,
  ) {
    const header = req.headers.authorization;
    const token = header.split(' ')[1]; // rm Bearer
    const headerEmail = getEmailFromAccessToken(token);

    if (email !== headerEmail) {
      throw new ForbiddenException('Access denied', 'Access denied');
    }

    await this.authService.changePassword(changePasswordDto, email);

    return this.responseFactory.sendOKResponse(
      res,
      'Change Password success',
      true,
    );
  }
}
