export declare class MenuChildDto {
    icon?: string;
    title: string;
    link?: string;
    target?: string;
}
export declare class MenuItemDto {
    icon?: string;
    title: string;
    link?: string;
    target?: string;
    hasChilds?: string;
    children: MenuChildDto[];
}
export declare class MenuContentDto {
    items: MenuItemDto[];
    customClasses?: string;
}
