import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsBoolean,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

/* ================= Child menu item ================= */

export class MenuChildDto {
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
  target?: string;
}

/* ================= Parent menu item ================= */

export class MenuItemDto {
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
  target?: string;

  @IsString()
  @IsOptional()
  hasChilds?: string;

  /* 🔥 children REQUIRED only if hasChilds === true */
  @ValidateIf((o) => o.hasChilds === 'true')
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuChildDto)
  children: MenuChildDto[];
}

/* ================= Menu content ================= */

export class MenuContentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  items: MenuItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
