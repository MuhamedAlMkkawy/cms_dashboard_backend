import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { plainToClass } from 'class-transformer';
import { CreatePageDto } from './dtos/CreatePage.dto';
import { UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { PageResponseDto } from './dtos/PageResponce.dto';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';

@Controller('pages')
@UseInterceptors(
  AnyFilesInterceptor({
    storage: diskStorage({
      destination: process.cwd() + '/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|svg\+xml)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
  FlatToNestedWithFilesInterceptor,
)
// @Serialize(PageResponseDto)
export class PagesController {
  constructor(private pagesService: PagesService) {}

  // -------------------
  // GET Pages
  // -------------------
  @Get()
  async getAllPages() {
    return await this.pagesService.getAllPages();
  }
  // -------------------
  // GET Project Pages
  // -------------------
  @Get('/:id')
  async getProjectPages(
    @Param('id', ParseIntPipe) id: number,
    @Headers('accept-language') language: string,
  ) {
    return await this.pagesService.getAllProjectPages(id, language);
  }

  // -------------------
  // GET Single Page
  // -------------------
  @Get('/:id')
  async getSinglePage(@Param('id') id: string) {
    return await this.pagesService.getSinglePage(id);
  }

  // -------------------
  // Delete Page
  // -------------------
  @Delete(':id')
  async deletePage(@Param('id') id: string) {
    return await this.pagesService.deletePage(id);
  }
}
