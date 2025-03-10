import { Injectable } from '@nestjs/common';
import { AccountServiceUser, UserSignUpDto } from '../dto/request/UserSignUp.dto';
import {
  ApiResponse,
  ErrorMessage,
  HttpContentType,
  HttpHeaders,
  HttpMethod,
  HttpServiceFactory,
  LoggerFactory,
  ResourceException,
} from 'common-lib';
import {
  ACCOUNT_SERVICE_BASEURL,
  ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
  ACCOUNT_SERVICE_PATH,
  API_KEY,
} from '../constants/ServiceConstant';
import { SuccessResponse } from 'common-lib/src/factory/response/SuccessResponse.entity';

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

      const response = await this.httpService.call<
        SuccessResponse<UserSignUpDto>
      >(
        HttpMethod.POST,
        ACCOUNT_SERVICE_BASEURL,
        ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
        headers,
        userDto,
      );

      if (!response) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
          'Response from account-service is null',
        );
      }

      const successResponse = response.data;
      const createdUser = successResponse.data;
      if (!createdUser) {
        throw new ResourceException(
          ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
          ErrorMessage.INTERNAL_SERVER_ERROR.getMessage,
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
