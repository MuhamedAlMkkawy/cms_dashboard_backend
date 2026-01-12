import { PageResponseDto } from '../pages/dtos/PageResponce.dto';
import { FlatToNestedWithFilesInterceptor } from '../interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToClass } from 'class-transformer';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { CreatePageDto } from 'src/pages/dtos/CreatePage.dto';
import { CardSliderDto } from '../components/dtos/fields/CardSliderDto.dto';
import { MenuContentDto } from '../components/dtos/fields/MenuDto.dto';
import { CustomHtmlDto } from '../components/dtos/fields/CustomHtml.dto';
import { LogoFieldsDto } from '../components/dtos/fields/LogoDto.dto';
import { ButtonsFieldsDto } from '../components/dtos/fields/Buttons.dto';
import { AccordionFieldsDto } from '../components/dtos/fields/Accordion.dto';
import { TimelineFieldsDto } from '../components/dtos/fields/Timeline.dto';
import { SocialMediaFieldsDto } from '../components/dtos/fields/SocialFields.dto';
import { TabsFieldsDto } from '../components/dtos/fields/TabsDto.dto';
import { validate } from 'class-validator';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { ProjectResponseDto } from './dtos/ProjectResponce.dto';

const componentDtoMap = {
  'card-slider': CardSliderDto,
  'nav-menu': MenuContentDto,
  'custom-html': CustomHtmlDto,
  logo: LogoFieldsDto,
  buttons: ButtonsFieldsDto,
  accordion: AccordionFieldsDto,
  timeline: TimelineFieldsDto,
  'social-media': SocialMediaFieldsDto,
  tabs: TabsFieldsDto,
};

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
  // @Serialize(ProjectResponseDto)
  async getAllProjects(@Headers('accept-language') language: string) {
    if (!language) {
      throw new BadRequestException('The Language is Required....');
    }

    return this.projectsService.getAllProjects(language);
  }

  // ----------------------------------
  // GET SINGLE PROJECT
  // ----------------------------------
  @Get('/:id')
  async getProject(
    @Param('id') id: string,
    @Headers('accept-language') language: string,
  ) {
    if (!language) {
      throw new BadRequestException('Language is required');
    }

    return this.projectsService.getProject(id, language);
  }

  // -------------------------------
  // CREATE PROJECT
  // -------------------------------
  @Post()
  async createProject(@Body() body: CreateProjectDto) {
    // const validatedBody = plainToClass(CreateProjectDto, body);
    const project = {
      ...body ,
      visible : true ,
      languages : ['ar' , 'en']
    };

    return this.projectsService.createProject(project);
  }

  // -------------------------------
  // UPDATE PROJECT
  // -------------------------------
  @Patch('/:id')
  async updateProject(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('accept-language') language: string,
  ) {
    if (!language) {
      throw new BadRequestException('Language is required');
    }

    return this.projectsService.updateProject(id, body, language);
  }

  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
  @Post('/:id/pages')
  // @Serialize(PageResponseDto)
  async addPagesToProject(
    @Param('id') id: string,
    @Body() body: any,
    @Headers('accept-language') language: string,
  ) {
    if (!body) {
      throw new NotFoundException('No Data Found to add...');
    }

    if (!language) {
      throw new BadRequestException('Language is Required....');
    }

    const validatedBody = plainToClass(CreatePageDto, {projectID : id , ...body});

    // Validate only new components
    for (const section of validatedBody.sections || []) {
      if (!section.components || !Array.isArray(section.components)) continue;

      for (const component of section.components) {
        
        const ComponentDto = componentDtoMap[component.type];
        if (!ComponentDto) {
          throw new NotFoundException(
            `Unknown component type: ${component.type}`,
          );
        }
        
        const validatedComponent = plainToClass(ComponentDto, component.content);
        // const errors = await validate(validatedComponent);


        // if (errors.length > 0) {
        //   console.log(errors)
        //   throw new BadRequestException(
        //     `Invalid data for component type: ${component.type}`,
        //   );
        // }

        Object.assign(component, validatedComponent);
      }
    }

    // Call service
    return this.projectsService.addPagesToProject(id, validatedBody, language);
  }

  // -------------------------------
  // UPDATE PAGES OF PROJECT
  // -------------------------------
  @Patch('/:projectId/pages/:pageId')
  async updatePageNested(
    @Param('projectId') projectId: string,
    @Param('pageId') pageId: string,
    @Body() body: any,
    @Headers('accept-language') language: string,
  ) {
    if (!language) {
      throw new BadRequestException('Language is required');
    }

    if(!body){
      throw new BadRequestException('No data provided for update');
    }

    return this.projectsService.updatePageNested(
      projectId,
      pageId,
      language,
      body,
    );
  }

  // -------------------------------
  // -----> TO DO <---- REMOVE PAGES FROM PROJECT
  // -------------------------------
  // @Delete('/:id/pages')
  // async removePagesFromProject(@Param('id') id: string, @Body() body: any) {
  //   const pageIds = body.pages; // <-- get the array

  //   return this.projectsService.removePagesFromProject(id, pageIds);
  // }

  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  @Delete('/:id')
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.deleteProject(id);
  }
}
