import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private statisticsService;
    constructor(statisticsService: StatisticsService);
    getAllStatistics(): Promise<{
        projects: number;
        pages: number;
        sections: number;
        components: number;
    }>;
}
