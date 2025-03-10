import { Expose } from 'class-transformer';

export class KeycloakTokenResponse {
  @Expose({ name: 'access_token' })
  accessToken: string;

  @Expose({ name: 'refresh_token' })
  refreshToken: string;

  @Expose({ name: 'expires_in' })
  expiresIn: number;

  @Expose({ name: 'refresh_expires_in' })
  refreshExpiresIn: number;

  @Expose({ name: 'token_type' })
  tokenType: string;

  email?: string;
}
