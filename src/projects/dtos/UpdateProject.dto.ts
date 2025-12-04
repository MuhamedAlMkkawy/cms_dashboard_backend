import { IsOptional, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LangObject {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  icon?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangObject)
  title?: LangObject;

  @IsOptional()
  @ValidateNested()
  @Type(() => LangObject)
  description?: LangObject;
}