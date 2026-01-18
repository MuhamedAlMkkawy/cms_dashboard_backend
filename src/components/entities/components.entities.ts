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
  visible: boolean;

  // // Store any of the content DTOs as JSON
  // @Column({ type: 'json' })
  // content: ComponentContent;
}
