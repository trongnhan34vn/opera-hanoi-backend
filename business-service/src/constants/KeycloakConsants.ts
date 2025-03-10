import * as process from 'node:process';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = '../../../env/.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

export const KEYCLOAK_SERVICE_HOST = process.env.KEYCLOAK_SERVICE_HOST;
export const KEYCLOAK_SERVICE_PORT = process.env.KEYCLOAK_SERVICE_PORT;
export const KEYCLOAK_SERVICE_URL = `http://${KEYCLOAK_SERVICE_HOST}:${KEYCLOAK_SERVICE_PORT}`;
export const KEYCLOAK_PROVIDER_TOKEN_URI_PATH =
  process.env.KEYCLOAK_PROVIDER_TOKEN_PATH_URI;

export const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
export const KEYCLOAK_CLIENT_SECRET = process.env.KEYCLOAK_CLIENT_SECRET
  ? process.env.KEYCLOAK_CLIENT_SECRET
  : 'HanoiOperaHouse';
export const KEYCLOAK_SERVICE_ADMIN_PATH_URI =
  process.env.KEYCLOAK_ADMIN_PATH_URI;
export const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
export const KEYCLOAK_PROVIDER_ISSUE_URI =
  process.env.KEYCLOAK_PROVIDER_ISSUE_URI;
export const KEYCLOAK_ADMIN_URI = process.env.KEYCLOAK_ADMIN_URI;
