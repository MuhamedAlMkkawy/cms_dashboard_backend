import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Logo image DTO
 * file = uploaded image path
 */
export class LogoImageDto {
  @IsString()
  file: string; // uploaded image path only
}

/**
 * Logo component content DTO
 */
export class LogoFieldsDto {
  @ValidateNested()
  @Type(() => LogoImageDto)
  image: LogoImageDto;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsString()
  @IsOptional()
  customClasses?: string;
}
