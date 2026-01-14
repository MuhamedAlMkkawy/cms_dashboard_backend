import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { UploadFile } from 'src/Decorators/UploadFile.decorator';

@Controller('uploads')
export class UploadsController {
  /**
   * Upload a single image/video
   * Returns the uploaded file path and original name inside `data`
   */
  @Post('single')
  @UploadFile({ type: 'single', fieldName: 'file' })
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    // return file info directly
    return {
      path: `/${file.path.replace(/\\/g, '/')}`,
      originalName: file.originalname,
    };
  }

  /**
   * Upload multiple images/videos
   * Returns array of uploaded file paths and original names inside `data`
   */
  @Post('multiple')
  @UploadFile({
    type: 'multiple',
    fieldName: 'files',
    maxFiles: 10,
  })
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || !files.length)
      throw new BadRequestException('No files uploaded');

    return files.map((file) => ({
      path: `/${file.path.replace(/\\/g, '/')}`,
      originalName: file.originalname,
    }))
  }
}
