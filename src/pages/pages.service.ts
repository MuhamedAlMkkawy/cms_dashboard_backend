import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pages } from './entities/pages.entities';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dtos/CreatePage.dto';
import { merge } from 'lodash';
import { UpdatePageDto } from './dtos/UpdatePage.dto';
import { I18nService } from 'nestjs-i18n'; // Add this import

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private readonly repo: Repository<Pages>,
    private readonly i18n: I18nService, // Add I18nService
  ) {}

  // --------------------
  // GET Pages
  // --------------------
  async getAllPages() {
    const pages = await this.repo.find();

    if (!pages.length) {
      throw new NotFoundException(
        await this.i18n.translate('pages.pagesService.NO_PAGES_FOUND'),
      );
    }

    return pages;
  }

  // -------------------
  // GET Single Page
  // -------------------
  async getSinglePage(id: string) {
    const pages = await this.getAllPages();

    const page = pages.find((page) => page._id.toString() === id);

    if (!page) {
      throw new NotFoundException(
        await this.i18n.translate('pages.pagesService.PAGE_NOT_FOUND'),
      );
    }

    return page;
  }

  // -------------------
  // Delete Page
  // -------------------
  async deletePage(id: string) {
    const page = await this.getSinglePage(id);

    if (!page) {
      throw new NotFoundException(
        await this.i18n.translate('pages.pagesService.PAGE_NOT_FOUND'),
      );
    }

    await this.repo.remove(page);

    return {
      message: await this.i18n.translate(
        'pages.pagesService.PAGE_DELETED_SUCCESS',
      ),
      data: null,
    };
  }
}
