export declare class SectionDto {
    id: number;
    name: string;
    visible: boolean;
    components: any[];
}
export declare class CreatePageDto {
    name: string;
    visible: string;
    projectID: string;
    language: string;
    sections: SectionDto[];
}
