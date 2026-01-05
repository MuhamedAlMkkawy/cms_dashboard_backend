import {
  IsString,
  IsBoolean,
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
  title?: string;

  @IsString()
  text?: string;

  @IsString()
  link?: string;
}

// Card slider content DTO
export class CardSliderDto {
  @IsString()
  @IsOptional()
  itemsToShow?: string; // can convert to number later if needed

  @IsBoolean()
  @IsOptional()
  autoplay?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardSliderItemDto)
  items: CardSliderItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
