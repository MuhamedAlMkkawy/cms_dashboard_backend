import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Components } from 'src/components/entities/components.entities';
import { Pages } from 'src/pages/entities/pages.entities';
import { Projects } from 'src/projects/entities/projects.entities';
import { Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepo: Repository<Projects>,

    @InjectRepository(Pages)
    private readonly pagesRepo: Repository<Pages>,

    @InjectRepository(Components)
    private readonly componentsRepo: Repository<Components>,
  ) {}

  // GET ALL STATISTICS
  async getAllStatistics() {
    const projects = (await this.projectsRepo.find()).length;
    const pages = (await this.pagesRepo.find()).length;
    const sections = (await this.pagesRepo.find()).reduce(
      (acc, page) => acc + (page.sections?.length || 0),
      0,
    );
    const components = (await this.componentsRepo.find()).length;

    const data = {
      projects: projects,
      pages: pages,
      sections: sections,
      components: components,
    };
        
    return data
  }
}
