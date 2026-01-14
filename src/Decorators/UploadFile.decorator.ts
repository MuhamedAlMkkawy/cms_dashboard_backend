// src/uploads/upload-file.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';

interface UploadOptions {
  type?: 'single' | 'multiple';
  fieldName?: string;
  folder?: string;
  maxFiles?: number;
  maxFileSize?: number;
  allowedMimeTypes?: RegExp;
}

export function UploadFile(options: UploadOptions) {
  const folder = options.folder || 'uploads';
  const fieldName =
    options.fieldName || (options.type === 'multiple' ? 'files' : 'file');
  const maxFiles = options.maxFiles || 10;
  const maxFileSize = options.maxFileSize || 50 * 1024 * 1024;
  const allowedMimeTypes =
    options.allowedMimeTypes || /\/(jpg|jpeg|png|gif|mp4|mov|avi|svg\+xml)$/;

  const storage = diskStorage({
    destination: (req, file, cb) => cb(null, `./${folder}`),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!file.mimetype.match(allowedMimeTypes)) {
      return cb(
        new BadRequestException('Only image/video files are allowed!'),
        false,
      );
    }
    cb(null, true);
  };

  const interceptor =
    options.type === 'multiple'
      ? FilesInterceptor(fieldName, maxFiles, {
          storage,
          limits: { fileSize: maxFileSize },
          fileFilter,
        })
      : FileInterceptor(fieldName, {
          storage,
          limits: { fileSize: maxFileSize },
          fileFilter,
        });

  return applyDecorators(UseInterceptors(interceptor));
}

//  HOW TO USE THE INTERCEPTOR TO UPLOAD SINGLE FILE
//  @UploadFile({ type: 'single', folder: 'avatars', fieldName: 'avatar' })

//  HOW TO USE THE INTERCEPTOR TO UPLOAD MULTIPLE FILES
// @UploadFile({ type: 'multiple', folder: 'gallery', maxFiles: 5, fieldName: 'images' })
