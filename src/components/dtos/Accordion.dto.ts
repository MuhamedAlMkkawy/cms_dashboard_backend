import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Single accordion item
 */
export class AccordionItemDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

/**
 * Accordion component fields
 */
export class AccordionFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AccordionItemDto)
  content: AccordionItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
