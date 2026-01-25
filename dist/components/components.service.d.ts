import { Components } from './entities/components.entities';
import { Repository } from 'typeorm';
import { UpdateComponentDto } from './dtos/UpdateComponent.dto';
import { I18nService } from 'nestjs-i18n';
export declare class ComponentsService {
    private componentsRepo;
    private readonly i18n;
    constructor(componentsRepo: Repository<Components>, i18n: I18nService);
    getAllComponents(): Promise<Components[]>;
    getSingleComponent(id: string): Promise<Components>;
    createComponent(data: any): Promise<Components[]>;
    updateComponent(id: string, data: UpdateComponentDto): Promise<any>;
    deleteComponent(id: string): Promise<{
        message: string;
        data: null;
    }>;
}
