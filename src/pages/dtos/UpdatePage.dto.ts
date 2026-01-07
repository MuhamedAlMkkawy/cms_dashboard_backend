import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

class OptionalLangObject {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  en?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  ar?: string;
}

export class UpdatePageDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @IsBoolean()
  visibility?: boolean;


  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString({ each: true })
  classes?: string[];
}
