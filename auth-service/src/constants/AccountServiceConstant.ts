import * as process from 'node:process';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = '../../.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

export const ACCOUNT_SERVICE_HOST = process.env.ACCOUNT_SERVICE_HOST;
export const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT;
export const ACCOUNT_SERVICE_BASEURL = `http://${ACCOUNT_SERVICE_HOST}:${ACCOUNT_SERVICE_PORT}`;
export const ACCOUNT_SERVICE_PATH = '/api/v1/account';
export const ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS = '/users';
export const API_KEY = process.env.API_KEY;
