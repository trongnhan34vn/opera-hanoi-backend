import { Injectable } from '@nestjs/common';
import { Log, LoggerFactory, ResourceError, ErrorMessage } from 'common-lib';
import { UserSignIn, UserSignUp } from '../interface/user.interface';
import { KeycloakTokenResponse } from '../interface/keycloak.interface';
import { KeycloakService } from './keycloak.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly logger: LoggerFactory,
  ) {}

  /**
   * sign in
   * Call sign in API of Keycloak
   * @param userLogin
   * @return KeycloakToken
   */
  @Log()
  async signIn(userLogin: UserSignIn): Promise<KeycloakTokenResponse> {
    // call api Keycloak and get response
    try {
      return await this.keycloakService.signIn(userLogin);
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${userLogin.email}].`,
        error.stack,
      );
      throw new ResourceError(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
        `Error occurred while signing in user [${userLogin.email}].`,
      );
    }
  }

  @Log()
  async signUp(userSignUp: UserSignUp): Promise<boolean> {
    try {
      return await this.keycloakService.signUp(userSignUp);
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${userSignUp.email}].`,
        error.stack,
      );
      throw new ResourceError(
        ErrorMessage.INTERNAL_SERVER_ERROR.getCode,
        `Error occurred while signing up user [${userSignUp.email}].`,
      );
    }
  }
}
