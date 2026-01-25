import { ComponentResponce } from '../../components/dtos/ComponentResponce.dto';
export declare class SectionResponseDto {
    id: string | number;
    name: string;
    visible: boolean;
    components: ComponentResponce[];
}
export declare class PageResponseDto {
    _id: string;
    name: string;
    visible: boolean;
    projectID: string;
    language: string;
    sections: SectionResponseDto[];
}
export declare class ProjectResponseDto {
    _id: string;
    logo: string;
    name: string;
    description: string;
    visible: boolean;
    languages: string[];
    pages: PageResponseDto[];
}
