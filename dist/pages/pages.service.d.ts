import { Pages } from './entities/pages.entities';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
export declare class PagesService {
    private readonly repo;
    private readonly i18n;
    constructor(repo: Repository<Pages>, i18n: I18nService);
    getAllPages(): Promise<Pages[]>;
    getAllProjectPages(id: number, language?: string): Promise<Pages[]>;
    getSinglePage(id: string): Promise<Pages>;
    deletePage(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
