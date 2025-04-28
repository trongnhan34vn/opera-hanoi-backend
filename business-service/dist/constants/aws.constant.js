"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_CLOUDFRONT_DOMAIN = exports.AWS_REGION = exports.AWS_S3_BUCKET_NAME = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_ACCESS_KEY_ID = void 0;
const process = require("node:process");
const dotenv = require("dotenv");
const path = require("path");
const envFilePath = '../../.env.local';
dotenv.config({ path: path.resolve(__dirname, envFilePath) });
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? 'Not Found Env';
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? 'Not Found Env';
exports.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME ?? 'Not Found Env';
exports.AWS_REGION = process.env.AWS_REGION ?? 'Not Found Env';
exports.AWS_CLOUDFRONT_DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN ?? 'Not Found Env';
//# sourceMappingURL=aws.constant.js.map