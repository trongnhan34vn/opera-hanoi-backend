export class AwsS3Client {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    cloudFrontDomain: string;
    s3BucketName: string;
    constructor(accessKeyId: string, secretAccessKey: string, region: string, s3BucketName:string, cloudFrontDomain: string) {
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;
        this.region = region;
        this.s3BucketName = s3BucketName;
        this.cloudFrontDomain = cloudFrontDomain;
    }
}