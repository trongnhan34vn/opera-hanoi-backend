import {
  KeycloakConnectOptions,
  PolicyEnforcementMode,
  TokenValidation,
} from 'nest-keycloak-connect';
import { Injectable } from '@nestjs/common';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_REALM,
  KEYCLOAK_SERVICE_URL,
} from '../constants/KeycloakConsants';

@Injectable()
export class KeycloakConfig {
  static getKeycloakConfig(): KeycloakConnectOptions {
    return {
      authServerUrl: KEYCLOAK_SERVICE_URL,
      realm: KEYCLOAK_REALM,
      clientId: KEYCLOAK_CLIENT_ID,
      secret: KEYCLOAK_CLIENT_SECRET,
      bearerOnly: true, // Chỉ sử dụng Bearer Token
      logLevels: ['verbose'],
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      tokenValidation: TokenValidation.ONLINE,
    };
  }
}
