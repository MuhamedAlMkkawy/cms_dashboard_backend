import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { MenuContentDto } from '../dtos/fields/MenuDto.dto';
import { CardSliderDto } from '../dtos/fields/CardSliderDto.dto';
import { CustomHtmlDto } from '../dtos/fields/CustomHtml.dto';
import { LogoFieldsDto } from '../dtos/fields/LogoDto.dto';
import { ButtonsFieldsDto } from '../dtos/fields/Buttons.dto';
import { AccordionFieldsDto } from '../dtos/fields/Accordion.dto';
import { TimelineFieldsDto } from '../dtos/fields/Timeline.dto';
import { SocialMediaFieldsDto } from '../dtos/fields/SocialFields.dto';
import { TabsFieldsDto } from '../dtos/fields/TabsDto.dto';

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
  label: Record<string , string>;

  @Column()
  icon: string;

  @Column()
  visible: string;

  // Store any of the content DTOs as JSON
  @Column({ type: 'json' })
  content: ComponentContent;
}
