import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpContentType } from 'common/dist/enum/http.content.enum';
import {
  HttpHeaders,
  IHttpServiceFactory,
} from 'common/dist/factory/http.service.factory.interface';
import { LoggerFactory } from 'common/dist/factory/impl/logger.factory.impl';
import {
  ACCOUNT_SERVICE_BASEURL,
  ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS,
  ACCOUNT_SERVICE_FIND_USER_BY_ID,
  ACCOUNT_SERVICE_PATH,
  API_KEY,
} from '../constants/ServiceConstant';
import { AccountServiceUser } from '../dto/request/UserSignUp.dto';
import { IHttpServiceFactoryToken } from 'common';

@Injectable()
export class AccountService {
  constructor(
    @Inject(IHttpServiceFactoryToken)
    private readonly httpService: IHttpServiceFactory,
    private readonly logger: LoggerFactory,
  ) {}

  async save(userDto: AccountServiceUser, token: string) {
    try {
      this.logger.log(
        `Start save user [${userDto.email}] to account service...`,
      );
      // call account-service
      const headers: HttpHeaders = {
        contentType: HttpContentType.JSON,
        apiKey: API_KEY,
        token,
      };

      const path = ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS;
      const response = await this.httpService.post(
        ACCOUNT_SERVICE_BASEURL,
        path,
        headers,
        userDto,
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
      this.logger.log('End save user.');
    }
  }

  async findUserById(id: string) {
    const headers: HttpHeaders = {
      contentType: HttpContentType.JSON,
      apiKey: API_KEY,
    };
    const path =
      ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_FIND_USER_BY_ID + `/${id}`;
    const response = await this.httpService.get(
      ACCOUNT_SERVICE_BASEURL,
      path,
      headers,
    );
    const user = response.data;
    return user;
  }

  async findUserByEmail(email: string, token: string) {
    const headers: HttpHeaders = {
      contentType: HttpContentType.JSON,
      apiKey: API_KEY,
      token
    };
    const path =
      ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_FIND_USER_BY_ID + '?email=' + email;
    const response = await this.httpService.get(
      ACCOUNT_SERVICE_BASEURL,
      path,
      headers,
    );
    const user = response.data;
    return user;
  }

  async deleteUserById(id: string, token: string) {
    try {
      const headers: HttpHeaders = {
        contentType: HttpContentType.JSON,
        apiKey: API_KEY,
        token,
      };
      const path =
        ACCOUNT_SERVICE_PATH + ACCOUNT_SERVICE_FIND_USER_BY_ID + `/${id}`;
      await this.httpService.delete(ACCOUNT_SERVICE_BASEURL, path, headers);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
