import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Single timeline item
 */
export class TimelineItemDto {
  @IsDateString()
  date: string;

  @IsString()
  icon: string;

  @IsString()
  title: Record<string , string>;

  @IsString()
  description: Record<string , string>;

  @IsString()
  @IsOptional()
  classes?: string;
}

/**
 * Timeline component fields
 */
export class TimelineFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimelineItemDto)
  content: TimelineItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
