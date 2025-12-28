import { IsBoolean, IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

class LangObject {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  project_id: number;

  @ValidateNested()
  @Type(() => LangObject)
  @IsNotEmpty()
  title: LangObject;

  @IsBoolean()
  @IsNotEmpty()
  visibility: boolean;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @IsOptional()
  sections: any[];
}
