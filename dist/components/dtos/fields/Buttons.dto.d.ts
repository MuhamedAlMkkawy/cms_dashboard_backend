export declare class ButtonItemDto {
    icon?: string;
    title: string;
    link?: string;
    target?: '_self' | '_blank';
    reversed?: string;
}
export declare class ButtonsFieldsDto {
    items: Record<string, ButtonItemDto>;
    customClasses?: string;
}
