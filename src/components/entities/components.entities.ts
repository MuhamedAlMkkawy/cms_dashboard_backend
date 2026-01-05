import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { MenuContentDto } from '../dtos/MenuDto.dto';
import { CardSliderDto } from '../dtos/CardSliderDto.dto';
import { CustomHtmlDto } from '../dtos/CustomHtml.dto';
import { LogoFieldsDto } from '../dtos/LogoDto.dto';
import { ButtonsFieldsDto } from '../dtos/Buttons.dto';
import { AccordionFieldsDto } from '../dtos/Accordion.dto';
import { TimelineFieldsDto } from '../dtos/Timeline.dto';
import { SocialMediaFieldsDto } from '../dtos/SocialFields.dto';
import { TabsFieldsDto } from '../dtos/TabsDto.dto';

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

@Entity()
export class Components {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  type: string;

  @Column()
  label: string;

  @Column()
  icon: string;
  
  @Column()
  visible: string;

  // Store any of the content DTOs as JSON
  @Column({ type: 'json' })
  content: ComponentContent;
}
