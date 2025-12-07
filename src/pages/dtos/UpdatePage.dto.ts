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
  @ValidateNested()
  @Type(() => OptionalLangObject)
  title?: OptionalLangObject;

  @IsOptional()
  @IsBoolean()
  visibility?: boolean;

  @IsOptional()
  @IsString({ each: true })
  classes?: string[];
}
