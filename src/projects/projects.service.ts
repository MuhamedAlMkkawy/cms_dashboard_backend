import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { merge } from 'lodash';
import { Projects } from './entities/projects.entities';
import { Pages } from 'src/pages/entities/pages.entities';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepo: Repository<Projects>,

    @InjectRepository(Pages)
    private readonly pageRepo: Repository<Pages>,
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
    const project = await this.projectsRepo.findOneBy({ _id: new ObjectId(id) });

    if (!project) {
      throw new NotFoundException('No Project found');
    }

    return {
      project
    };
  }




  // -------------------------------
  // CREATE PROJECT
  // -------------------------------
  async createProject(project: CreateProjectDto) {
    const newProject = this.projectsRepo.create({
      ...project,
      pages: [], // start empty
    });

    return await this.projectsRepo.save(newProject);
  }





  // -------------------------------
  // UPDATE PROJECT
  // -------------------------------
  async updateProject(id: string, project: UpdateProjectDto) {
    const existing = await this.projectsRepo.findOneBy({ _id: new ObjectId(id) });

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
  async addPagesToProject(projectId: string, pageIds: string[]) {
    const project = await this.projectsRepo.findOneBy({ _id: new ObjectId(projectId) });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const ids = pageIds.map(id => (id));

    const pages = await this.pageRepo.find();
    const filteredPages = pages.filter((page) => ids.includes(page._id.toString()));

    return await this.projectsRepo.save({
      ...project , 
      pages : filteredPages
    });
  }





  // -------------------------------
  // DELETE PROJECT
  // -------------------------------
  async deleteProject(id: string) {
    const project = await this.projectsRepo.findOneBy({ _id: new ObjectId(id) });

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
