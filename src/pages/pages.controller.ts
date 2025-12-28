import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
      destination: `./uploads`,
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() + '-' + Math.round(Math.random() * 1e9);
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
  FlatToNestedWithFilesInterceptor
)
@Serialize(PageResponseDto)
export class PagesController {
  constructor(
    private pagesService : PagesService
  ) {}


  // GET Pages
  @Get()
  async getAllPages() {
    return await this.pagesService.getAllPages()
  }



  // GET Single Page
  @Get('/:id')
  async getSinglePage(@Param('id') id : string) {
    return await this.pagesService.getSinglePage(id)
  }



  // Create Page
  @Post()
  async createPage(@Body() body : any) {
    const validatedPage = plainToClass(CreatePageDto, body)
    return await this.pagesService.createPage(validatedPage)
  }


  // Update Page
  @Patch('/:id')
  async updatePage(@Param('id') id : string , @Body() page : any) {
    const validatedPage = plainToClass(CreatePageDto, page)
    return await this.pagesService.updatePage(id , validatedPage)
  }


  // Delete Page
  @Delete(':id')
  async deletePage(@Param('id') id : string) {
    return await this.pagesService.deletePage(id)
  }
}


