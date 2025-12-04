import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class LangObject {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ValidateNested()
  @Type(() => LangObject)
  title: LangObject;

  @ValidateNested()
  @Type(() => LangObject)
  description: LangObject;
}
