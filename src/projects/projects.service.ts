import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { merge } from 'lodash';
import { Projects } from './entities/projects.entities';
import { Pages, Section } from 'src/pages/entities/pages.entities';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Components } from 'src/components/entities/components.entities';



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
  async getAllProjects(language: string) {
    const projects = await this.projectsRepo.find();

    if (!projects.length) {
      throw new NotFoundException('No Projects Added Yet');
    }

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
        "The Project You 're looking for isn't found!!",
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

    // Merge DTO into existing
    const updatedProject = merge(existing, project);

    // Save clean version (without populated pages)
    return await this.projectsRepo.save(updatedProject);
  }

  // -------------------------------
  // ADD PAGES TO PROJECT
  // -------------------------------
  async addPagesToProject(projectId: string, pageData: any, language: string) {
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const newPage = new Pages();
    newPage.projectID = new ObjectId(projectId).toString();
    newPage.name = pageData.name || 'Untitled Page';
    newPage.visible = pageData.visible || 'true';
    newPage.language = language;
    newPage.sections = [];

    for (const secData of pageData.sections || []) {
      const section: Section = {
        id: secData.id,
        name: secData.name || 'Untitled Section',
        visible: secData.visible ?? 'true',
        components: [],
      };

      for (const compData of secData.components || []) {
        const component = this.componentsRepo.create({
          type: compData.type,
          label: compData.label || '',
          icon: compData.icon || '',
          visible: compData.visible || 'true',
          content: compData.content || {},
        });
        const savedComponent = await this.componentsRepo.save(component);
        section.components.push(savedComponent);
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

  // The function works on 3 levels depending on the payload:
  // 1️⃣ Page level → no sectionId
  // 2️⃣ Section level → sectionId is present but no componentId and payload.data changes in section
  // 3️⃣ Component level → sectionId + componentId are present and payload.data changes in component
  // -------------------------------

  async updatePageNested(
    projectId: string,
    pageId: string,
    language: string,
    payload: any,
  ) {
    const page = await this.pageRepo.findOne({
      where: {
        _id: new ObjectId(pageId),
        projectID: new ObjectId(projectId).toString(),
        language,
      },
    });

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    /* ================= PAGE ================= */
    if (!payload.sectionId) {
      Object.assign(page, payload);
      return this.pageRepo.save(page);
    }

    /* ================= SECTION ================= */
    const section = page.sections.find(
      (s) => String(s.id) === String(payload.sectionId),
    );

    if (!section) {
      throw new NotFoundException('Section not found');
    }

    if (!payload.componentId) {
      Object.assign(section, payload.data);
      return this.pageRepo.save(page);
    }

    /* ================= COMPONENT ================= */
    const component = section.components.find(
      (c) => String(c._id) === String(payload.componentId),
    );

    if (!component) {
      throw new NotFoundException('Component not found');
    }

    Object.assign(component, payload.data);

    return this.pageRepo.save(page);
  }

  // -------------------------------
  // -----> TO DO <---- REMOVE PAGES FROM PROJECT
  // -------------------------------

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
