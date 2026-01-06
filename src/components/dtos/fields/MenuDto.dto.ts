import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

// Child menu item
export class MenuChildDto {
  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  title: Record<string , string>;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  target?: string; // "_self" | "_blank" etc.
}

// Parent menu item
export class MenuItemDto {
  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  title: Record<string , string>;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  target?: string;

  @IsBoolean()
  @IsOptional()
  hasChilds?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuChildDto)
  @IsOptional()
  children?: MenuChildDto[];
}

// The menu content DTO
export class MenuContentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  items: MenuItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
