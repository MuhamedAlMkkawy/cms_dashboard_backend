import { AccordionFieldsDto } from "./fields/Accordion.dto";
import { ButtonsFieldsDto } from "./fields/Buttons.dto";
import { CardSliderDto } from "./fields/CardSliderDto.dto";
import { CustomHtmlDto } from "./fields/CustomHtml.dto";
import { LogoFieldsDto } from "./fields/LogoDto.dto";
import { MenuContentDto } from "./fields/MenuDto.dto";
import { SocialMediaFieldsDto } from "./fields/SocialFields.dto";
import { TabsFieldsDto } from "./fields/TabsDto.dto";
import { TimelineFieldsDto } from "./fields/Timeline.dto";

export const componentDtoMap = {
  logo: LogoFieldsDto,
  timeline: TimelineFieldsDto,
  'card-slider': CardSliderDto,
  'nav-menu': MenuContentDto,
  'custom-html': CustomHtmlDto,
  buttons: ButtonsFieldsDto,
  accordion: AccordionFieldsDto,
  'social-media': SocialMediaFieldsDto,
  tabs: TabsFieldsDto,
};
