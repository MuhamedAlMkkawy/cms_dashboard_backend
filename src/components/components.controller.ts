import { ComponentsService } from './components.service';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseInterceptors, Delete } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { FlatToNestedWithFilesInterceptor } from 'src/interceptors/FlatToNestedWithFilesInterceptor.interceptor';
import { CreateComponentDto } from './dtos/CreateComponent.dto';
import { plainToClass } from 'class-transformer';
import { ComponentResponce } from './dtos/ComponentResponce.dto';
import { Serialize } from 'src/interceptors/dataSerializor.interceptor';
import { UpdateComponentDto } from './dtos/UpdateComponent.dto';

@Controller('components')
@UseInterceptors(AnyFilesInterceptor(), FlatToNestedWithFilesInterceptor)
export class ComponentsController {
  constructor(private ComponentsService: ComponentsService) {}

  // ------------------------------
  // GET ALL COMPONENTS
  // ------------------------------
  @Get()
  @Serialize(ComponentResponce)
  async getAllComponents() {
    const components = await this.ComponentsService.getAllComponents();

    return components;
  }

  // ------------------------------
  // GET SINGLE COMPONENT
  // ------------------------------
  @Get('/:id')
  @Serialize(ComponentResponce)
  async getSingleComponent(@Param('id') id: string) {
    return await this.ComponentsService.getSingleComponent(id);
  }

  // ------------------------------
  // CREATE NEW COMPONETNS
  // ------------------------------
  @Post()
  @Serialize(ComponentResponce)
  async createNewComponent(@Body() body: any) {
    const validatedComponent = plainToClass(CreateComponentDto, body);

    return await this.ComponentsService.createComponent(validatedComponent);
  }

  // ------------------------------
  // UPDATE COMPONETNS
  // ------------------------------
  @Patch('/:id')
  @Serialize(ComponentResponce)
  async updateComponent(@Param('id') id: string, @Body() body: any) {
    const updatedComponent = await this.ComponentsService.updateComponent(
      id,
      body,
    );

    return updatedComponent;
  }

  // ------------------------------
  // DELETE COMPONETNS
  // ------------------------------
  @Delete('/:id')
  async deleteComponent(@Param('id') id: string) {
    return await this.ComponentsService.deleteComponent(id);
  }
}
