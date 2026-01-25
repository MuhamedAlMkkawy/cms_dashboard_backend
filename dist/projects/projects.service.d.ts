import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Projects } from './entities/projects.entities';
import { Pages } from 'src/pages/entities/pages.entities';
import { UpdateProjectDto } from './dtos/UpdateProject.dto';
import { Components } from 'src/components/entities/components.entities';
import { I18nService } from 'nestjs-i18n';
export declare class ProjectsService {
    private readonly projectsRepo;
    private readonly pageRepo;
    private readonly componentsRepo;
    private readonly i18n;
    constructor(projectsRepo: Repository<Projects>, pageRepo: Repository<Pages>, componentsRepo: Repository<Components>, i18n: I18nService);
    getAllProjects(language: string): Promise<{
        pages: Pages[];
        _id: ObjectId;
        logo: string;
        name: string;
        description: string;
        visible: boolean;
        languages: string[];
    }[]>;
    getProject(id: string, language: string): Promise<{
        pages: Pages[];
        _id: ObjectId;
        logo: string;
        name: string;
        description: string;
        visible: boolean;
        languages: string[];
    }>;
    createProject(data: any): Promise<Projects[]>;
    updateProject(id: string, project: UpdateProjectDto, language: string): Promise<any>;
    addPagesToProject(projectId: string, pageData: any, language: string): Promise<Pages>;
    updatePageNested(projectId: string, pageId: string, language: string, pageData: any): Promise<Pages>;
    deleteProject(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
