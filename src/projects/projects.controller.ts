import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TransformFlatToNestedInterceptor } from 'src/interceptors/transformFlatToNested.interceptor';
import { MergeFileFieldsInterceptor } from 'src/interceptors/mergeFileFields.interceptor';
import { plainToClass } from 'class-transformer';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';

@Controller('projects')
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
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }),
  TransformFlatToNestedInterceptor,
  MergeFileFieldsInterceptor
)

export class ProjectsController {
  constructor(private readonly projectsService : ProjectsService) {}


  // -------------------------------
  // GET ALL PROJECTS
  // -------------------------------
  @Get()
  async getAllProjects() {
    return this.projectsService.getAllProjects()
  }



  // -------------------------------
  // GET PROJECT WITH PAGES POPULATED
  // -------------------------------
  @Get('/:id')
  async getProject(@Param('id') id : string) {
    return this.projectsService.getProject(id)
  }



  // -------------------------------
  // CREATE PROJECT
  // -------------------------------
  @Post()
  async createProject(@Body() body : any) {
    const validatedBody = plainToClass(CreateProjectDto, body)

    return this.projectsService.createProject(validatedBody)
  }


  // -------------------------------
  // UPDATE PROJECT
  // -------------------------------
  @Patch('/:id')
  async updateProject(@Param('id') id : string , @Body() body : any) {
    const validatedBody = plainToClass(UpdateProjectDto, body)
    return this.projectsService.updateProject(id, validatedBody)
  }



  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
  @Post('/:id/pages')
  async addPagesToProject(@Param('id') id : string , @Body() body : any) {
    const pageIds = body.pages; // <-- get the array

    return this.projectsService.addPagesToProject(id, pageIds)
  }



  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  @Delete('/:id')
  async deleteProject(@Param('id') id : string) {
    return this.projectsService.deleteProject(id)
  }
}
