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


@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Components)
    private componentsRepo: Repository<Components>,
  ) {}

  // ------------------------------
  // GET ALL COMPONETNS
  // ------------------------------
  async getAllComponents() {
    const data = await this.componentsRepo.find();

    // if (!data[0]) throw new NotFoundException('No Components Found!!');

    return data;
  }

  // ------------------------------
  // GET SINGLE COMPONENT
  // ------------------------------
  async getSingleComponent(id : string){
    const component = await this.componentsRepo.findOneBy({
      _id : new ObjectId(id)
    })


    if(!component){
      throw new NotFoundException('This Component Isn\'t Found')
    }

    return component
  }



  // ------------------------------
  // CREATE NEW COMPONETNS
  // ------------------------------
  async createComponent(data: any) {
    const components = await this.getAllComponents();

    const isComponentFound = components.find((item) => item.type == data.type);

    if (isComponentFound) {
      throw new BadRequestException('This Component Type is Found Already!');
    }

    const newComponent = this.componentsRepo.create(data);

    return await this.componentsRepo.save(newComponent);
  }

  // ------------------------------
  // UPDATE COMPONETNS
  // ------------------------------
  async updateComponent(id: string, data: UpdateComponentDto) {
    const component = await this.getSingleComponent(id)

    const updatedComponent = merge(component, data);


    const updated = await this.componentsRepo.save(updatedComponent);
    return updated;
  }

  // ------------------------------
  // DELETE COMPONETNS
  // ------------------------------
  async deleteComponent(id : string){
    const component = await this.getSingleComponent(id)

    await this.componentsRepo.remove(component)

    return {
      message : 'Component Is deleted Successfully' ,
      data : null
    }
  }
}
