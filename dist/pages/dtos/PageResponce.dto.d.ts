export declare class PageResponseDto {
    id: string;
    name: string;
    language: string;
    projectID: string;
    visible: boolean;
    sections: SectionResponseDto[];
}
export declare class SectionResponseDto {
    id: number;
    name: string;
    visible: boolean;
    components: any[];
}
