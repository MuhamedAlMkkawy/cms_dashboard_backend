import {
  IsString,
  IsOptional,
  IsBoolean,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Single button item
 */
export class ButtonItemDto {
  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  target?: '_self' | '_blank';

  @IsBoolean()
  @IsOptional()
  reversed?: boolean;
}

/**
 * Buttons component fields
 */
export class ButtonsFieldsDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ButtonItemDto)
  items: Record<string, ButtonItemDto>;

  @IsString()
  @IsOptional()
  customClasses?: string;
}
