import { KeycloakConnectOptions } from 'nest-keycloak-connect';
export declare class KeycloakConfig {
    static getKeycloakConfig(authServiceUrl: string, realm: string, clientId: string, secret: string): KeycloakConnectOptions;
}
