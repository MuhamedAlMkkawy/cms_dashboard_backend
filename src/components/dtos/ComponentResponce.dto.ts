import { Expose, Type } from "class-transformer";
import { MenuContentDto } from './MenuDto.dto';
import { CardSliderDto } from './CardSliderDto.dto';
import { CustomHtmlDto } from './CustomHtml.dto';
import { LogoFieldsDto } from './LogoDto.dto';
import { ButtonsFieldsDto } from './Buttons.dto';
import { AccordionFieldsDto } from './Accordion.dto';
import { TimelineFieldsDto } from './Timeline.dto';
import { SocialMediaFieldsDto } from './SocialFields.dto';
import { TabsFieldsDto } from './TabsDto.dto';

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