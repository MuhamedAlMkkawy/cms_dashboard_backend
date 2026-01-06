import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Individual card item
export class CardSliderItemDto {
  @IsString()
  file?: string; // file path

  @IsString()
  title?: Record<string , string>;

  @IsString()
  text?: Record<string , string>;

  @IsString()
  link?: string;
}

// Card slider content DTO
export class CardSliderDto {
  @IsString()
  @IsOptional()
  itemsToShow?: string;

  @IsString()
  @IsOptional()
  autoplay?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardSliderItemDto)
  items: CardSliderItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
