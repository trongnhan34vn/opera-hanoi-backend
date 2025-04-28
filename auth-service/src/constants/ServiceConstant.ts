import * as process from 'node:process';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

// ACCOUNT SERVICE
export const ACCOUNT_SERVICE_HOST = process.env.ACCOUNT_SERVICE_HOST;
export const ACCOUNT_SERVICE_PORT = process.env.ACCOUNT_SERVICE_PORT;
export const ACCOUNT_SERVICE_BASEURL = `http://${ACCOUNT_SERVICE_HOST}:${ACCOUNT_SERVICE_PORT}`;
export const ACCOUNT_SERVICE_PATH = '/api/v1/account';
export const ACCOUNT_SERVICE_CREATE_USER_ENDPOINTS = '/users';
// ACCOUNT SERVICE

// BUSINESS SERVICE
export const BUSINESS_SERVICE_HOST = process.env.BUSINESS_SERVICE_HOST;
export const BUSINESS_SERVICE_PORT = process.env.BUSINESS_SERVICE_PORT;
export const BUSINESS_SERVICE_BASEURL = `http://${BUSINESS_SERVICE_HOST}:${BUSINESS_SERVICE_PORT}`;
export const BUSINESS_SERVICE_PATH = '/api/v1/business';
export const BUSINESS_SERVICE_CREATE_CART_ENDPOINT = '/carts';
// BUSINESS SERVICE

// OTHERS
export const API_KEY = process.env.API_KEY;
