import { AwsS3Client } from "src/entity";


export const AwsS3ClientFactory = (config: { 
  accessKeyId: string, 
  secretAccessKey: string, 
  region: string, 
  s3BucketName: string, 
  cloudFrontDomain: string 
}) => {
  return new AwsS3Client(
    config.accessKeyId, 
    config.secretAccessKey, 
    config.region,
    config.s3BucketName, 
    config.cloudFrontDomain
  );
};
