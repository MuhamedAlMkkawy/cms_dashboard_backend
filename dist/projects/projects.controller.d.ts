import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/CreateProject.dto';
import { I18nService } from 'nestjs-i18n';
export declare class ProjectsController {
    private readonly projectsService;
    private readonly i18n;
    constructor(projectsService: ProjectsService, i18n: I18nService);
    getAllProjects(language: string): Promise<{
        pages: import("../pages/entities/pages.entities").Pages[];
        _id: import("bson").ObjectId;
        logo: string;
        name: string;
        description: string;
        visible: boolean;
        languages: string[];
    }[]>;
    getProject(id: string, pageName: string, language: string): Promise<import("../pages/entities/pages.entities").Pages | {
        pages: import("../pages/entities/pages.entities").Pages[];
        _id: import("bson").ObjectId;
        logo: string;
        name: string;
        description: string;
        visible: boolean;
        languages: string[];
    }>;
    createProject(body: CreateProjectDto): Promise<import("./entities/projects.entities").Projects[]>;
    updateProject(id: string, body: any, language: string): Promise<any>;
    addPagesToProject(id: string, body: any, language: string): Promise<import("../pages/entities/pages.entities").Pages>;
    updatePageNested(projectId: string, pageId: string, body: any, language: string): Promise<import("../pages/entities/pages.entities").Pages>;
    deleteProject(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
