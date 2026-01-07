import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pages } from './entities/pages.entities';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dtos/CreatePage.dto';
import { merge } from 'lodash';
import { UpdatePageDto } from './dtos/UpdatePage.dto';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private readonly repo : Repository<Pages>
  ) {}

  // --------------------
  // GET Pages
  // --------------------
  async getAllPages() {
    const pages =  await this.repo.find();

    if(!pages.length){
      throw new NotFoundException('No pages found')
    }

    return pages;
  }


  // -------------------
  // GET Single Page
  // -------------------
  async getSinglePage(id : string) {
    const pages = await this.getAllPages()

    const page = pages.find((page) => page._id.toString() === id);

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }


  // -------------------
  // Delete Page
  // -------------------
  async deletePage(id : string) {
    const page = await this.getSinglePage(id)

    if(!page){
      throw new NotFoundException('No Page found')
    }

    await this.repo.remove(page)

    return {
      message : 'Page deleted successfully',
      data : null
    } 
  }

}
