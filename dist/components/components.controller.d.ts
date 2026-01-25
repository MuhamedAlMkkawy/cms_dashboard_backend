import { ComponentsService } from './components.service';
export declare class ComponentsController {
    private ComponentsService;
    constructor(ComponentsService: ComponentsService);
    getAllComponents(): Promise<import("./entities/components.entities").Components[]>;
    getSingleComponent(id: string): Promise<import("./entities/components.entities").Components>;
    createNewComponent(body: any): Promise<import("./entities/components.entities").Components[]>;
    updateComponent(id: string, body: any): Promise<any>;
    deleteComponent(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
