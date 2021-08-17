import { HttpException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';

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
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'image';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (request, file, callback) => {
      const uuidPath = `${uuid()}${extname(file.originalname)}`;
      callback(null, uuidPath);
    },
  }),
};
