import * as process from 'node:process';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });

export const AWS_ACCESS_KEY_ID =
  process.env.AWS_ACCESS_KEY_ID ?? 'Not Found Env';
export const AWS_SECRET_ACCESS_KEY =
  process.env.AWS_SECRET_ACCESS_KEY ?? 'Not Found Env';
export const AWS_S3_BUCKET_NAME =
  process.env.AWS_S3_BUCKET_NAME ?? 'Not Found Env';
export const AWS_REGION = process.env.AWS_REGION ?? 'Not Found Env';
export const AWS_CLOUDFRONT_DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN ?? 'Not Found Env';