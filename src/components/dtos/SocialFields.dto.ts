import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Single social media item
 */
export class SocialMediaItemDto {
  @IsString()
  icon: string;

  @IsString()
  link: string;

  @IsString()
  color: string;

  @IsString()
  @IsOptional()
  classes?: string;
}

/**
 * Social Media component fields
 */
export class SocialMediaFieldsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialMediaItemDto)
  content: SocialMediaItemDto[];

  @IsString()
  @IsOptional()
  customClasses?: string;
}
