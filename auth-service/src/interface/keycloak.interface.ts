export interface KeycloakRequest {
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  grant_type: string;
}

export interface KeycloakTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenId: string;
  expiresIn: number;
  refreshExpiresIn: number;
}
