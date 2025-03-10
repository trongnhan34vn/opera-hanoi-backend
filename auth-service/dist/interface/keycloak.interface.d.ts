export interface KeycloakRequest {
    client_id: string;
    client_secret: string;
    username: string;
    password: string;
    grant_type: string;
}
export interface UserKeycloakRegistry {
    email: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    credentials: Credential[];
}
export interface Credential {
    type: 'password';
    value: string;
}
