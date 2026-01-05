import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Single tab item
 */
export class TabItemDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

/**
 * Tabs component fields
 */
export class TabsFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabItemDto)
  content: TabItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
