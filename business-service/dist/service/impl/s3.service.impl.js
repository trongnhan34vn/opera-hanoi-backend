"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const common_2 = require("common");
const moment = require("moment-timezone");
const aws_constant_1 = require("../../constants/aws.constant");
let S3Service = class S3Service {
    constructor(logger) {
        this.logger = logger;
        this.s3Client = new client_s3_1.S3Client({
            region: aws_constant_1.AWS_REGION,
            credentials: {
                accessKeyId: aws_constant_1.AWS_ACCESS_KEY_ID,
                secretAccessKey: aws_constant_1.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async uploadMultipleFilesToS3(files) {
        try {
            this.logger.log('Start upload file to S3');
            const urls = [];
            for (const file of files) {
                const url = await this.uploadFileToS3(file);
                urls.push(url);
            }
            this.logger.log('Upload files to S3 success');
            return urls;
        }
        catch (error) {
            throw error;
        }
        finally {
            this.logger.log('End upload file to S3');
        }
    }
    async uploadFileToS3(file) {
        try {
            let isUploadFileSuccess = false;
            const fileName = file.originalname;
            const timestamp = moment().format('YYYYMMDD');
            const key = `images/${timestamp}/${timestamp}_${fileName}`;
            const uploadParams = {
                Bucket: aws_constant_1.AWS_S3_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const command = new client_s3_1.PutObjectCommand(uploadParams);
            await this.s3Client.send(command);
            isUploadFileSuccess = true;
            if (!isUploadFileSuccess)
                throw new common_2.InternalServerException(`Upload File ${fileName} error`);
            const url = `https://${aws_constant_1.AWS_CLOUDFRONT_DOMAIN}/${key}`;
            return url;
        }
        catch (error) {
            this.logger.error(`Error while upload file [${file.originalname}] to S3: ${error.message}`);
            throw error;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_2.LoggerFactory])
], S3Service);
//# sourceMappingURL=s3.service.impl.js.map