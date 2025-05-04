import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UserDto } from '../dto/request/user.dto';

import { Response } from 'express';

import { HttpResponseFactory, SkipAuth } from 'common';
import { Roles } from 'nest-keycloak-connect';
import { IUserServiceToken } from 'src/constants/symbol';
import { KeycloakRoleEnum } from 'src/enum/keycloak.role.enum';
import { IUserService } from 'src/service/user.service.interface';

@Controller('/api/v1/account')
export class UserController {
  constructor(
    @Inject(IUserServiceToken)
    private readonly userService: IUserService,
    private readonly responseFactory: HttpResponseFactory,
  ) {}

  @Post('/users')
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ADMIN_ACCOUNT_ROLE,
      KeycloakRoleEnum.PUT_ADMIN_ACCOUNT_ROLE,
    ],
  })
  async createUser(@Res() res: Response, @Body() userDto: UserDto) {
    const user = await this.userService.save(userDto);
    return this.responseFactory.sendCreatedResponse(
      res,
      `User created successfully [${userDto.email}]`,
      user,
    );
  }

  @Delete('/users/:accountId')
  @Roles({
    roles: [
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ADMIN_ACCOUNT_ROLE,
      KeycloakRoleEnum.DELETE_ADMIN_ACCOUNT_ROLE,
    ],
  })
  async deleteUser(
    @Res() res: Response,
    @Param('accountId') accountId: string,
  ) {
    await this.userService.delete(accountId);
    return this.responseFactory.sendOKResponse(
      res,
      `User ${accountId} is deleted`,
      true,
    );
  }

  @Get('/users')
  @Roles({
    roles: [
      KeycloakRoleEnum.VIEW_ADMIN_ACCOUNT_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ADMIN_ACCOUNT_ROLE,
      KeycloakRoleEnum.FULL_ACCESS_ROLE,
    ],
  })
  async findUserByEmail(@Res() res: Response, @Query('email') email: string) {
    const result = await this.userService.findByEmail(email);
    return this.responseFactory.sendOKResponse(
      res,
      `User founded with email [${email}]`,
      result,
    );
  }
}
