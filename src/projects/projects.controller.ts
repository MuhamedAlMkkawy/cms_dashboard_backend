import { FlatToNestedWithFilesInterceptor } from '../interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import {
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

const componentDtoMap = {
  'card-slider': CardSliderDto,
  'nav-menu': MenuContentDto,
  'custom-html': CustomHtmlDto,
  'logo': LogoFieldsDto,
  'buttons': ButtonsFieldsDto,
  'accordion': AccordionFieldsDto,
  'timeline' : TimelineFieldsDto,
  'social-media': SocialMediaFieldsDto,
  'tabs' : TabsFieldsDto,
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
  @Post('/:id/pages')
  async addPagesToProject(
    @Param('id') id: string,
    @Query('pageId') pageId: string, // optional query param
    @Body() body: any,
    @Headers('accept-language') acceptLanguage: string,
  ) {
    if (!body) {
      throw new NotFoundException('No Data Found to add...');
    }

    const validatedBody = plainToClass(CreatePageDto, body);

    // Validate only new components
    for (const section of validatedBody.sections) {
      if (!section.components || !Array.isArray(section.components)) continue;

      for (const component of section.components) {
        if (component.id) continue; // skip existing components

        const ComponentDto = componentDtoMap[component.type];
        if (!ComponentDto) {
          throw new NotFoundException(
            `Unknown component type: ${component.type}`,
          );
        }

        const validatedComponent = plainToClass(ComponentDto, component);
        const errors = await validate(validatedComponent);

        if (errors.length > 0) {
          throw new NotFoundException(
            `Invalid data for new component type: ${component.type}`,
          );
        }

        Object.assign(component, validatedComponent);
      }
    }

    // Call service
    return this.projectsService.addPagesToProject(
      id,
      pageId,
      validatedBody,
      acceptLanguage,
    );
  }

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
