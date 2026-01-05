import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { MenuContentDto } from './MenuDto.dto';
import { CardSliderDto } from './CardSliderDto.dto';
import { CustomHtmlDto } from './CustomHtml.dto';
import { LogoFieldsDto } from './LogoDto.dto';
import { ButtonsFieldsDto } from './Buttons.dto';
import { AccordionFieldsDto } from './Accordion.dto';
import { TimelineFieldsDto } from './Timeline.dto';
import { SocialMediaFieldsDto } from './SocialFields.dto';
import { TabsFieldsDto } from './TabsDto.dto';

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
