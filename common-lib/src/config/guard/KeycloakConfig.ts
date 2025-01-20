import { KeycloakConnectOptions } from 'nest-keycloak-connect';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakConfig {
  static getKeycloakConfig(
    authServiceUrl: string,
    realm: string,
    clientId: string,
    secret: string,
  ): KeycloakConnectOptions {
    return {
      authServerUrl: authServiceUrl,
      realm: realm,
      clientId: clientId,
      secret: secret,
      useNestLogger: true, // Sử dụng NestJS Logger
      bearerOnly: true, // Chỉ sử dụng Bearer Token
    };
  }
}
