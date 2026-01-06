import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { merge } from 'lodash';
import { Projects } from './entities/projects.entities';
import { Pages, Section } from 'src/pages/entities/pages.entities';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Components } from 'src/components/entities/components.entities';
import { v4 as uuidv4 } from 'uuid';



@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepo: Repository<Projects>,

    @InjectRepository(Pages)
    private readonly pageRepo: Repository<Pages>,

    @InjectRepository(Components)
    private readonly componentsRepo: Repository<Components>,
  ) {}

  // -------------------------------
  // GET ALL PROJECTS
  // -------------------------------
  async getAllProjects() {
    const projects = await this.projectsRepo.find();
    if (!projects || projects.length === 0) {
      throw new NotFoundException('No Projects found');
    }
    return projects;
  }

  // -------------------------------
  // GET PROJECT WITH PAGES POPULATED
  // -------------------------------
  async getProject(id: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!project) {
      throw new NotFoundException('No Project found');
    }

    return project;
  }

  // -------------------------------
  // CREATE PROJECT
  // -------------------------------
  async createProject(data: any) {
    const newProject = this.projectsRepo.create(data);

    return await this.projectsRepo.save(newProject);
  }

  // -------------------------------
  // UPDATE PROJECT
  // -------------------------------
  async updateProject(id: string, project: UpdateProjectDto) {
    const existing = await this.projectsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!existing) {
      throw new NotFoundException('No Project found');
    }

    // Merge DTO into existing
    const updatedProject = merge(existing, project);

    // Save clean version (without populated pages)
    return await this.projectsRepo.save(updatedProject);
  }




  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
  async addPagesToProject(
    projectId: string,
    pageId: string,
    pageData: any,
    acceptLanguage: string,
  ) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });
    if (!project) throw new NotFoundException('Project not found');

    // Find existing page by pageId, if exists
    let existingPage;
    if (pageId) {
      existingPage = await this.pageRepo.findOneBy({ pageId });
    }

    // If page exists, add/update language
    if (existingPage) {
      // Add/update name for this language
      existingPage.name = existingPage.name || {};
      existingPage.name[acceptLanguage] = pageData.name || 'Untitled Page';

      // Update sections and components for this language
      if (pageData.sections && Array.isArray(pageData.sections)) {
        existingPage.sections = existingPage.sections || [];

        for (const secData of pageData.sections) {
          // Find existing section by id or create new
          let section = existingPage.sections.find(s => s.id === secData.id);
          if (!section) {
            section = {
              id: secData.id,
              name: {},
              visible: secData.visible ?? true,
              components: [],
            };
            existingPage.sections.push(section);
          }

          // Set section name for this language
          section.name = section.name || {};
          section.name[acceptLanguage] = secData.name || 'Untitled Section';

          // Process components
          if (secData.components && Array.isArray(secData.components)) {
            for (const compData of secData.components) {
              // Check if component already exists in section (by type + optional id)
              let component = section.components.find(c => c.type === compData.type && c._id?.toString() === compData._id);
              if (!component) {
                component = new Components();
                component.type = compData.type;
                component.icon = compData.icon || '';
                component.visible = compData.visible || 'true';
                component.content = compData.content || {};
                component.label = {};
                const savedComponent = await this.componentsRepo.save(component);
                section.components.push(savedComponent);
                component = savedComponent;
              }

              // Set label for this language
              component.label = component.label || {};
              component.label[acceptLanguage] = compData.label || '';
            }
          }
        }
      }

      // Save updated page
      const savedPage = await this.pageRepo.save(existingPage);
      return savedPage;
    }
  // If page does not exist, create new
    const newPage = new Pages();
    newPage.pageId = pageId || uuidv4();
    newPage.name = { [acceptLanguage]: pageData.name || 'Untitled Page' };
    newPage.visible = pageData.visible || 'true';
    newPage.sections = [];

    if (pageData.sections && Array.isArray(pageData.sections)) {
      for (const secData of pageData.sections) {
        const section: Section = {
          id: secData.id,
          name: { [acceptLanguage]: secData.name || 'Untitled Section' },
          visible: secData.visible ?? true,
          components: [],
        };

        if (secData.components && Array.isArray(secData.components)) {
          for (const compData of secData.components) {
            const component = new Components();
            component.type = compData.type;
            component.label = { [acceptLanguage]: compData.label || '' };
            component.icon = compData.icon || '';
            component.visible = compData.visible || 'true';
            component.content = compData.content || {};
            const savedComponent = await this.componentsRepo.save(component);
            section.components.push(savedComponent);
          }
        }

        newPage.sections.push(section);
      }
    }

    const savedPage = await this.pageRepo.save(newPage);

    // Add page to project
    project.pages = project.pages ? [...project.pages, savedPage] : [savedPage];
    await this.projectsRepo.save(project);

    return savedPage;
  }



  // -------------------------------
  // REMOVE PAGES FROM PROJECT
  // -------------------------------
  async removePagesFromProject(projectId: string, pageIds: string[]) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const ids = pageIds.map((id) => id);

    const pages = await this.pageRepo.find();
    const filteredPages = pages.filter((page) =>
      ids.includes(page._id.toString()),
    );

    return await this.projectsRepo.save({
      ...project,
      pages: filteredPages,
    });
  }

  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  async deleteProject(id: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!project) {
      throw new NotFoundException('No Project found');
    }

    await this.projectsRepo.remove(project);

    return {
      message: 'Project deleted successfully',
      data: null,
    };
  }
}
