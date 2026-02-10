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
import { Components } from "src/components/entities/components.entities";
import { Column, Entity, ObjectIdColumn } from "typeorm";

export type ComponentContent =
  | CardSliderDto
  | MenuContentDto
  | CustomHtmlDto
  | LogoFieldsDto
  | ButtonsFieldsDto
  | AccordionFieldsDto
  | TimelineFieldsDto
  | SocialMediaFieldsDto
  | TabsFieldsDto;



export interface PageComponent {
  id: string; // uuid / timestamp
  componentId: ObjectId; // ref to Components (_id)
  type: string; // nav-menu, slider...
  visible: boolean;
  order: number;
  content: ComponentContent; // content per page
}



export interface Section {
  id: number;
  name: string;
  visible: boolean;
  components: PageComponent[]; // مش Components[]
}



@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'json' })
  name: string;

  @Column()
  visible: boolean;

  @Column()
  projectID : string;

  @Column()
  language: string;

  @Column({ type: 'json' })
  sections: Section[];
}