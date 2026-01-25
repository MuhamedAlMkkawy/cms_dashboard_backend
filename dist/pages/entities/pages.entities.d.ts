import { ObjectId } from "mongodb";
import { AccordionFieldsDto } from "src/components/dtos/fields/Accordion.dto";
import { ButtonsFieldsDto } from "src/components/dtos/fields/Buttons.dto";
import { CardSliderDto } from "src/components/dtos/fields/CardSliderDto.dto";
import { CustomHtmlDto } from "src/components/dtos/fields/CustomHtml.dto";
import { LogoFieldsDto } from "src/components/dtos/fields/LogoDto.dto";
import { MenuContentDto } from "src/components/dtos/fields/MenuDto.dto";
import { SocialMediaFieldsDto } from "src/components/dtos/fields/SocialFields.dto";
import { TabsFieldsDto } from "src/components/dtos/fields/TabsDto.dto";
import { TimelineFieldsDto } from "src/components/dtos/fields/Timeline.dto";
export type ComponentContent = CardSliderDto | MenuContentDto | CustomHtmlDto | LogoFieldsDto | ButtonsFieldsDto | AccordionFieldsDto | TimelineFieldsDto | SocialMediaFieldsDto | TabsFieldsDto;
export interface PageComponent {
    id: string;
    componentId: ObjectId;
    type: string;
    visible: boolean;
    order: number;
    content: ComponentContent;
}
export interface Section {
    id: number;
    name: string;
    visible: boolean;
    components: PageComponent[];
}
export declare class Pages {
    _id: ObjectId;
    name: string[];
    visible: boolean;
    projectID: string;
    language: string;
    sections: Section[];
}
