import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { merge } from 'lodash';
import { Projects } from './entities/projects.entities';
import { PageComponent, Pages, Section } from 'src/pages/entities/pages.entities';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Components } from 'src/components/entities/components.entities';
import { CreateProjectDto } from './dtos/CreateProject.dto';
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
  async getAllProjects(language: string) {
    const projects = await this.projectsRepo.find();

    // if (!projects.length) {
    //   throw new Error('No Projects Added Yet');
    // }

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
    // 1️⃣ Find project
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });

    if (!project) throw new NotFoundException('Project not found');

    // 2️⃣ Create new page
    const newPage = new Pages();
    newPage.projectID = projectId;
    newPage.name = pageData.name || 'Untitled Page';
    newPage.visible = pageData.visible ?? true;
    newPage.language = language;
    newPage.sections = [];

    // 3️⃣ Process sections
    for (const [secIndex, secData] of (pageData.sections || []).entries()) {
      const section: Section = {
        id: Math.ceil(Math.random() * 1e7),
        name: secData.name || 'Untitled Section',
        visible: secData.visible ?? true,
        components: [],
      };

      // 4️⃣ Process components
      for (const [compIndex, compData] of (
        secData.components || []
      ).entries()) {
        const targetComponent = await this.componentsRepo.findOneBy({
          type: compData.type,
        });

        if (!targetComponent)
          throw new NotFoundException(
            `Component type not found: ${compData.type}`,
          );

        const pageComponent: PageComponent = {
          id: uuidv4(), // unique per page
          componentId: targetComponent._id,
          type: targetComponent.type,
          visible: compData.visible ?? true,
          order: compIndex,
          content: compData.content || {}, // specific to this page
        };

        section.components.push(pageComponent);
      }

      newPage.sections.push(section);
    }

    // 5️⃣ Save page
    const savedPage = await this.pageRepo.save(newPage);

    // 6️⃣ Add page reference to project
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
  // async updatePageNested(
  //   projectId: string,
  //   pageId: string,
  //   language: string,
  //   payload: any,
  // ) {
  //   const page = await this.pageRepo.findOne({
  //     where: {
  //       _id: new ObjectId(pageId),
  //       projectID: new ObjectId(projectId).toString(),
  //       language,
  //     },
  //   });

  //   if (!page) {
  //     throw new NotFoundException('Page not found');
  //   }

  //   /* ================= PAGE ================= */
  //   if (!payload.sectionId) {
  //     Object.assign(page, payload);
  //     return this.pageRepo.save(page);
  //   }

  //   /* ================= SECTION ================= */
  //   const section = page.sections.find(
  //     (s) => String(s.id) === String(payload.sectionId),
  //   );

  //   if (!section) {
  //     throw new NotFoundException('Section not found');
  //   }

  //   if (!payload.componentId) {
  //     Object.assign(section, payload.data);
  //     return this.pageRepo.save(page);
  //   }

  //   /* ================= COMPONENT ================= */
  //   const component = section.components.find(
  //     (c) => String(c._id) === String(payload.componentId),
  //   );

  //   if (!component) {
  //     throw new NotFoundException('Component not found');
  //   }

  //   Object.assign(component, payload.data);

  //   return this.pageRepo.save(page);
  // }
  // -------------------------------
  async updatePageNested(
    projectId: string,
    pageId: string,
    language: string,
    pageData: any,
  ) {
    // 1️⃣ Find the project
    const project = await this.projectsRepo.findOneBy({
      _id: new ObjectId(projectId),
    });
    if (!project) throw new NotFoundException('Project not found');

    // 2️⃣ Find the page inside the project
    const pageIndex = project.pages?.findIndex(
      (p) => p._id.toString() === pageId,
    );
    if (pageIndex === undefined || pageIndex === -1)
      throw new NotFoundException('Page not found');

    const existingPage = project.pages[pageIndex];

    // 3️⃣ Update basic page info
    existingPage.name = pageData.name || existingPage.name || 'Untitled Page';
    existingPage.visible = pageData.visible ?? existingPage.visible;
    existingPage.language = language || existingPage.language;

    // 4️⃣ Update sections
    existingPage.sections = [];

    for (const [secIndex, secData] of (pageData.sections || []).entries()) {
      const section: Section = {
        id: Math.ceil(Math.random() * 1e7),
        name: secData.name || 'Untitled Section',
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
            `Component type not found: ${compData.type}`,
          );

        const pageComponent: PageComponent = {
          id: uuidv4(), // unique per page
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

    // 5️⃣ Save the updated page
    const savedPage = await this.pageRepo.save(existingPage);

    // 6️⃣ Update project pages array and save
    project.pages[pageIndex] = savedPage;
    await this.projectsRepo.save(project);

    return savedPage;
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
