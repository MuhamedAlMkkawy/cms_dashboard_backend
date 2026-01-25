import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { merge } from 'lodash';
import { Projects } from './entities/projects.entities';
import {
  PageComponent,
  Pages,
  Section,
} from 'src/pages/entities/pages.entities';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Components } from 'src/components/entities/components.entities';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { v4 as uuidv4 } from 'uuid';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepo: Repository<Projects>,

    @InjectRepository(Pages)
    private readonly pageRepo: Repository<Pages>,

    @InjectRepository(Components)
    private readonly componentsRepo: Repository<Components>,

    private readonly i18n: I18nService,
  ) {}

  // -------------------------------
  // GET ALL PROJECTS
  // -------------------------------
  async getAllProjects(language: string) {
    const projects = await this.projectsRepo.find();

    const projectsWithPages = await Promise.all(
      projects.map(async (project) => {
        const pages = await this.pageRepo.find({
          where: {
            projectID: new ObjectId(project._id).toString(),
            language,
          },
        });

        return {
          ...project,
          pages,
        };
      }),
    );

    return projectsWithPages;
  }

  // -------------------------------
  // GET SINGLE PROJECT
  // -------------------------------
  async getProject(id: string, language: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!project) {
      throw new NotFoundException(
        await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'),
      );
    }

    const pages = await this.pageRepo.find({
      where: {
        projectID: new ObjectId(project._id).toString(),
        language,
      },
    });

    return {
      ...project,
      pages,
    };
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
  async updateProject(id: string, project: UpdateProjectDto, language: string) {
    const existing = await this.getProject(id, language);

    const updatedProject = merge(existing, project);

    return await this.projectsRepo.save(updatedProject);
  }

  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
  async addPagesToProject(projectId: string, pageData: any, language: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });

    if (!project)
      throw new NotFoundException(
        await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'),
      );

    const newPage = new Pages();
    newPage.projectID = projectId;
    newPage.name =
      pageData.name ||
      (await this.i18n.translate('projects.service.UNTITLED_PAGE'));
    newPage.visible = pageData.visible ?? true;
    newPage.language = language;
    newPage.sections = [];

    for (const [secIndex, secData] of (pageData.sections || []).entries()) {
      const section: Section = {
        id: Math.ceil(Math.random() * 1e7),
        name:
          secData.name ||
          (await this.i18n.translate(
            'projects.service.UNTITLED_SECTION',
          )),
        visible: secData.visible ?? true,
        components: [],
      };

      for (const [compIndex, compData] of (
        secData.components || []
      ).entries()) {
        const targetComponent = await this.componentsRepo.findOneBy({
          type: compData.type,
        });

        if (!targetComponent)
          throw new NotFoundException(
            await this.i18n.t(
              'projects.service.COMPONENT_TYPE_NOT_FOUND',
              {
                args: { type: compData.type },
              },
            ),
          );

        const pageComponent: PageComponent = {
          id: uuidv4(),
          componentId: targetComponent._id,
          type: targetComponent.type,
          visible: compData.visible ?? true,
          order: compIndex,
          content: compData.content || {},
        };

        section.components.push(pageComponent);
      }

      newPage.sections.push(section);
    }

    const savedPage = await this.pageRepo.save(newPage);

    project.pages = project.pages ? [...project.pages, savedPage] : [savedPage];
    await this.projectsRepo.save(project);

    return savedPage;
  }

  // -------------------------------
  // UPDATE PAGES OF PROJECT
  // -------------------------------
  async updatePageNested(
    projectId: string,
    pageId: string,
    language: string,
    pageData: any,
  ) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });
    if (!project)
      throw new NotFoundException(
        await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'),
      );

    const pageIndex = project.pages?.findIndex(
      (p) => p._id.toString() === pageId,
    );
    if (pageIndex === undefined || pageIndex === -1)
      throw new NotFoundException(
        await this.i18n.translate('projects.service.PAGE_NOT_FOUND'),
      );

    const existingPage = project.pages[pageIndex];

    existingPage.name =
      pageData.name ||
      existingPage.name ||
      (await this.i18n.translate('projects.service.UNTITLED_PAGE'));
    existingPage.visible = pageData.visible ?? existingPage.visible;
    existingPage.language = language || existingPage.language;

    existingPage.sections = [];

    for (const [secIndex, secData] of (pageData.sections || []).entries()) {
      const section: Section = {
        id: Math.ceil(Math.random() * 1e7),
        name:
          secData.name ||
          (await this.i18n.translate(
            'projects.service.UNTITLED_SECTION',
          )),
        visible: secData.visible ?? true,
        components: [],
      };

      for (const [compIndex, compData] of (
        secData.components || []
      ).entries()) {
        const targetComponent = await this.componentsRepo.findOneBy({
          type: compData.type,
        });

        if (!targetComponent)
          throw new NotFoundException(
            await this.i18n.t(
              'projects.service.COMPONENT_TYPE_NOT_FOUND',
              {
                args: { type: compData.type },
              },
            ),
          );

        const pageComponent: PageComponent = {
          id: uuidv4(),
          componentId: targetComponent._id,
          type: targetComponent.type,
          visible: compData.visible ?? true,
          order: compIndex,
          content: compData.content || {},
        };

        section.components.push(pageComponent);
      }

      existingPage.sections.push(section);
    }

    const savedPage = await this.pageRepo.save(existingPage);

    project.pages[pageIndex] = savedPage;
    await this.projectsRepo.save(project);

    return savedPage;
  }

  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  async deleteProject(id: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(id),
    });

    if (!project) {
      throw new NotFoundException(
        await this.i18n.translate('projects.service.PROJECT_NOT_FOUND'),
      );
    }

    await this.projectsRepo.remove(project);

    return {
      message: await this.i18n.translate(
        'projects.service.PROJECT_DELETED_SUCCESS',
      ),
      data: null,
    };
  }
}
