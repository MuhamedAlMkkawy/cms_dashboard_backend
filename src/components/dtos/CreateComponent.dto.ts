import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { MenuContentDto } from './fields/MenuDto.dto';
import { CardSliderDto } from './fields/CardSliderDto.dto';
import { CustomHtmlDto } from './fields/CustomHtml.dto';
import { LogoFieldsDto } from './fields/LogoDto.dto';
import { ButtonsFieldsDto } from './fields/Buttons.dto';
import { AccordionFieldsDto } from './fields/Accordion.dto';
import { TimelineFieldsDto } from './fields/Timeline.dto';
import { SocialMediaFieldsDto } from './fields/SocialFields.dto';
import { TabsFieldsDto } from './fields/TabsDto.dto';

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsNotEmpty()
  visible: string;

  // Single content property
  @ValidateNested()
  @Type(() => Object) // Default to object; we'll cast depending on type
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
