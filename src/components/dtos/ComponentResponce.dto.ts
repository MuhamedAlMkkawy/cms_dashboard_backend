import { Expose, Type } from 'class-transformer';
import { MenuContentDto } from './fields/MenuDto.dto';
import { CardSliderDto } from './fields/CardSliderDto.dto';
import { CustomHtmlDto } from './fields/CustomHtml.dto';
import { LogoFieldsDto } from './fields/LogoDto.dto';
import { ButtonsFieldsDto } from './fields/Buttons.dto';
import { AccordionFieldsDto } from './fields/Accordion.dto';
import { TimelineFieldsDto } from './fields/Timeline.dto';
import { SocialMediaFieldsDto } from './fields/SocialFields.dto';
import { TabsFieldsDto } from './fields/TabsDto.dto';

export class ComponentResponce {
  @Expose()
  _id: string;

  @Expose()
  type: string;

  @Expose()
  label: string;

  @Expose()
  icon: string;

  @Expose()
  visible: boolean;

  @Expose()
  @Type(() => Object)
  content?:
    | CardSliderDto
    | MenuContentDto
    | CustomHtmlDto
    | LogoFieldsDto
    | ButtonsFieldsDto
    | AccordionFieldsDto
    | TimelineFieldsDto
    | SocialMediaFieldsDto
    | TabsFieldsDto;
}
