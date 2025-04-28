import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDto } from '../dto/request/user.dto';
import { UserService } from '../service/user.service.impl';

import { Response } from 'express';
import { SkipAuth } from '../config/SkipAuthGuardAnnotationConfig';
import { HttpResponseFactory } from 'common';

@Controller('/api/v1/account')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseFactory: HttpResponseFactory,
  ) {}

  @Post('/users')
  @SkipAuth()
  async createUser(@Res() res: Response, @Body() userDto: UserDto) {
    const user = await this.userService.save(userDto);
    return this.responseFactory.sendCreatedResponse(
      res,
      `User created successfully [${userDto.email}]`,
      user,
    );
  }
}
