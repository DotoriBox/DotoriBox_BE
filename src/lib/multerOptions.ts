import { HttpException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const multerOptions = {
  fileFilter: (
    req: any,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(
        new HttpException('지원하지 않는 이미지 형식입니다.', 400),
        false,
      );
    }
  },
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `images/${uuid()}${extname(file.originalname)}`);
    },
  }),
};
