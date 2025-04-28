import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ACCOUNT_SERVICE_BASEURL,
  ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
  ACCOUNT_SERVICE_PATH,
  API_KEY,
} from '../constants/ServiceConstant';
import {
  AccountServiceUser,
  UserSignUpDto,
} from '../dto/request/UserSignUp.dto';
import { HttpServiceFactory } from 'common/dist/factory/impl/http.service.factory.impl';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import {
  HttpEndpoint,
  HttpHeaders,
} from 'common/dist/factory/http.service.factory.interface';
import { HttpContentType } from 'common/dist/enum/http.content.enum';
import { HttpMethod } from 'common';

@Injectable()
export class AccountService {
  constructor(
    private readonly httpService: HttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  async save(userDto: AccountServiceUser) {
    try {
      this.logger.log(
        `Start save user [${userDto.email}] to account service...`,
      );
      // call account-service
      const headers: HttpHeaders = {
        contentType: HttpContentType.JSON,
        apiKey: API_KEY,
      };

      // const response = await this.httpService.call<
      //   SuccessResponse<UserSignUpDto>
      // >(
      //   HttpMethod.POST,
      //   ACCOUNT_SERVICE_BASEURL,
      //   ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
      //   headers,
      //   userDto,
      // );
      const endpoint: HttpEndpoint = {
        baseURL: ACCOUNT_SERVICE_BASEURL,
        path: ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
      };
      
      const response = await this.httpService.call(
        endpoint,
        HttpMethod.POST,
        userDto,
        headers,
      );

      if (!response) {
        throw new InternalServerErrorException(
          'Response from account-service is null',
        );
      }

      const successResponse = response.data;
      const createdUser = successResponse.data;
      if (!createdUser) {
        throw new InternalServerErrorException(
          'Data response from account-service is null',
        );
      }

      this.logger.log(`Saved user [${userDto.email}] successfully!`);
      return createdUser.id;
    } catch (error) {
      this.logger.error(error);
      throw error;
    } finally {
      this.logger.log('End saved user.');
    }
  }
}
