import { Components } from 'src/components/entities/components.entities';
import { Pages } from 'src/pages/entities/pages.entities';
import { Projects } from 'src/projects/entities/projects.entities';
import { Repository } from 'typeorm';
export declare class StatisticsService {
    private readonly projectsRepo;
    private readonly pagesRepo;
    private readonly componentsRepo;
    constructor(projectsRepo: Repository<Projects>, pagesRepo: Repository<Pages>, componentsRepo: Repository<Components>);
    getAllStatistics(): Promise<{
        projects: number;
        pages: number;
        sections: number;
        components: number;
    }>;
}
