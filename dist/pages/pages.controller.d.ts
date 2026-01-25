import { PagesService } from './pages.service';
export declare class PagesController {
    private pagesService;
    constructor(pagesService: PagesService);
    getAllPages(): Promise<import("./entities/pages.entities").Pages[]>;
    getSinglePage(id: string): Promise<import("./entities/pages.entities").Pages>;
    deletePage(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
