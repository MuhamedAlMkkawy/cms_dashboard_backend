import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Components } from './entities/components.entities';
import { Repository } from 'typeorm';
import { UpdateComponentDto } from './dtos/UpdateComponent.dto';
import { merge } from 'lodash';
import { ObjectId } from 'mongodb';
import { I18nService } from 'nestjs-i18n'; // Add this import

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Components)
    private componentsRepo: Repository<Components>,
    private readonly i18n: I18nService, // Add I18nService
  ) {}

  // ------------------------------
  // GET ALL COMPONENTS
  // ------------------------------
  async getAllComponents() {
    const data = await this.componentsRepo.find();

    // Uncomment and translate if needed
    if (!data.length) {
      throw new NotFoundException(
        await this.i18n.translate('components.componentsService.NO_COMPONENTS_FOUND'),
      );
    }

    return data;
  }

  // ------------------------------
  // GET SINGLE COMPONENT
  // ------------------------------
  async getSingleComponent(id: string) {
    const component = await this.componentsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!component) {
      throw new NotFoundException(
        await this.i18n.translate(
          'components.componentsService.COMPONENT_NOT_FOUND',
        ),
      );
    }

    return component;
  }

  // ------------------------------
  // CREATE NEW COMPONENTS
  // ------------------------------
  async createComponent(data: any) {
    const components = await this.getAllComponents();

    const isComponentFound = components.find((item) => item.type == data.type);

    if (isComponentFound) {
      throw new BadRequestException(
        await this.i18n.translate(
          'components.componentsService.COMPONENT_TYPE_EXISTS',
        ),
      );
    }

    const newComponent = this.componentsRepo.create(data);
    return await this.componentsRepo.save(newComponent);
  }

  // ------------------------------
  // UPDATE COMPONENTS
  // ------------------------------
  async updateComponent(id: string, data: UpdateComponentDto) {
    const component = await this.getSingleComponent(id);
    const updatedComponent = merge(component, data);
    const updated = await this.componentsRepo.save(updatedComponent);
    return updated;
  }

  // ------------------------------
  // DELETE COMPONENTS
  // ------------------------------
  async deleteComponent(id: string) {
    const component = await this.getSingleComponent(id);
    await this.componentsRepo.remove(component);

    return {
      message: await this.i18n.translate(
        'components.componentsService.COMPONENT_DELETED_SUCCESS',
      ),
      data: null,
    };
  }
}
