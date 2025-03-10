import { Injectable } from '@nestjs/common';
import {
  ErrorMessage,
  Log,
  LoggerFactory,
  ResourceException,
} from 'common-lib';
import { KeycloakService } from './keycloak.service';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';
import { AccountService } from './account.service';
import { CartService } from './cart.service';
import * as jwt from 'jsonwebtoken';
import { KeycloakTokenResponse } from '../dto/response/KeycloakTokenResponse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly logger: LoggerFactory,
    private readonly accountService: AccountService,
    private readonly cartService: CartService,
  ) {}

  /**
   * sign in
   * Call sign in API of Keycloak
   * @param userLogin
   * @return KeycloakToken
   */
  @Log()
  async signIn(userLogin: UserSignInDto): Promise<KeycloakTokenResponse> {
    try {
      return await this.keycloakService.signIn(userLogin);
    } catch (error) {
      this.logger.error(
        `Error occurred while signing in user [${userLogin.email}].`,
        error.stack,
      );
      throw error;
    }
  }

  async signInAdmin(userLogin: UserSignInDto) {
    try {
      const response = await this.signIn(userLogin);
      const tokenResponse = plainToInstance(KeycloakTokenResponse, response, {
        excludeExtraneousValues: true,
      });
      const accessToken = tokenResponse.accessToken;
      const decodedToken = jwt.decode(accessToken);
      const resourceAccess = decodedToken['resource_access'];
      const app = resourceAccess['hanoi-opera-app'];
      const roles: string[] = app['roles'];
      let isAdmin = false;
      roles.forEach((role) => {
        if (role.includes('ADMIN')) {
          isAdmin = true;
        }
      });
      if (!isAdmin) {
        throw new ResourceException(
          ErrorMessage.FORBIDDEN.getCode,
          ErrorMessage.FORBIDDEN.getMessage,
          `Account [${userLogin.email}] doesn't have permission`,
        );
      }

      tokenResponse.email = decodedToken['email'];
      return tokenResponse;
    } catch (error) {
      this.logger.error('Error occurred while signing in admin account', error);
      throw error;
    }
  }

  /**
   * sign up
   * @param userSignUp
   */
  @Log()
  async signUp(userSignUp: UserSignUpDto): Promise<boolean> {
    try {
      // 1. sign up with Keycloak server
      const createdUser = await this.keycloakService.signUp(userSignUp);

      // 2. save user info into account-service
      const userId = await this.accountService.save({
        ...userSignUp,
        keycloakId: createdUser.id,
      });

      // 3. create cart
      await this.cartService.createCart(userId);

      return true;
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${userSignUp.email}].`,
        error.stack,
      );
      // START TRANSACTION
      await this.keycloakService.signUpTransaction(userSignUp);
      // START TRANSACTION
      throw error;
    }
  }
}
