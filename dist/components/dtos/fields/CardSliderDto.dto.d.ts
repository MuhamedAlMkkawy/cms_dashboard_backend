export declare class CardSliderItemDto {
    file?: string;
    title?: string;
    text?: string;
    link?: string;
}
export declare class CardSliderDto {
    itemsToShow?: number;
    autoplay?: string;
    items: CardSliderItemDto[];
    customClasses?: string;
}
