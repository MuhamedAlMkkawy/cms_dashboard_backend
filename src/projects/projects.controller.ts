import { FlatToNestedWithFilesInterceptor } from '../interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';

@Controller('projects')
@UseInterceptors(
  AnyFilesInterceptor({
    storage: diskStorage({
      destination: `./uploads`,
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file) {
        return new Error("Logo isn't Uploaded");
      } else if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|svg\+xml)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
  FlatToNestedWithFilesInterceptor,
)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // -------------------------------
  // GET ALL PROJECTS
  // -------------------------------
  @Get()
  async getAllProjects() {
    return this.projectsService.getAllProjects();
  }

  // ----------------------------------
  // GET PROJECT WITH PAGES POPULATED
  // ----------------------------------
  @Get('/:id')
  async getProject(@Param('id') id: string) {
    return this.projectsService.getProject(id);
  }

  // -------------------------------
  // CREATE PROJECT
  // -------------------------------
  @Post()
  async createProject(@Body() body: any) {
    const validatedBody = plainToClass(CreateProjectDto, body);

    return this.projectsService.createProject(validatedBody);
  }

  // -------------------------------
  // UPDATE PROJECT
  // -------------------------------
  @Patch('/:id')
  async updateProject(@Param('id') id: string, @Body() body: any) {
    const validatedBody = plainToClass(UpdateProjectDto, body);
    return this.projectsService.updateProject(id, validatedBody);
  }




  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
    // @Post('/:id/pages')
    // async addPagesToProject(@Param('id') id: string, @Body('page') body: string) {
    //   // const pageIds = body.pages; // <-- get the array
    //   if(!body){
    //     throw new NotFoundException('No Data Found to added... ')
    //   }

    //   return this.projectsService.addPagesToProject(id, body)
    // }




  // -------------------------------
  // REMOVE PAGES FROM PROJECT
  // -------------------------------
  @Delete('/:id/pages')
  async removePagesFromProject(@Param('id') id: string, @Body() body: any) {
    const pageIds = body.pages; // <-- get the array

    return this.projectsService.removePagesFromProject(id, pageIds);
  }

  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  @Delete('/:id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
