import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Projects } from './entities/projects.entities';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { merge } from 'lodash';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepo: Repository<Projects>,
  ) {}

  // GET ALL PROJECTS
  async getAllProjects() {
    const projects = await this.projectsRepo.find()
    if(!projects){
      throw new NotFoundException('No Projects found')
    }
    return projects
  }



  // GET PROJECT
  async getProject (id : string) {
    const project = await this.projectsRepo.findOneBy({ _id: new ObjectId(id) });
    
    if(!project){
      throw new NotFoundException('No Project found');
    }

    return project;
  }



  
  // CREATE PROJECT
  async createProject(project : CreateProjectDto) {
    const newProject = this.projectsRepo.create(project)
    if(!newProject){
      throw new NotFoundException('No Project found')
    }
    return await this.projectsRepo.save(newProject)    
  }



  // UPDATE PROJECT
  async updateProject(id : string , project : UpdateProjectDto) {
    const targetProject = await this.getProject(id)

    if(!targetProject){
      throw new NotFoundException('No Project found')
    }
    const updatedProject = merge({}, targetProject, project);
    // Correct update syntax - update where _id matches, set the data
    
    const updated = await this.projectsRepo.save(updatedProject);
    
    return updated;
  }

  // DELETE PROJECT
  async deleteProject(id : string) {
    const project = await this.getProject(id)

    if(!project){
      throw new NotFoundException('No Project found')
    }

    await this.projectsRepo.remove(project)

    return {
      message : 'Project deleted successfully',
      data : null
    } 
  }
}
