import { Injectable } from '@nestjs/common';
import { Log, LoggerFactory } from 'common-lib';
import { KeycloakTokenResponse } from '../interface/keycloak.interface';
import { KeycloakService } from './keycloak.service';
import { UserSignUpDto } from '../dto/request/UserSignUp.dto';
import { UserSignInDto } from '../dto/request/UserSignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly logger: LoggerFactory,
  ) {
  }

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
        `Error occurred while signing up user [${userLogin.email}].`,
        error.stack,
      );
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
      return await this.keycloakService.signUp(userSignUp);
    } catch (error) {
      this.logger.error(
        `Error occurred while signing up user [${userSignUp.email}].`,
        error.stack,
      );
      throw error;
    }
  }
}
