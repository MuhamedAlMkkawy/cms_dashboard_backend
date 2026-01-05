import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Pages } from 'src/pages/entities/pages.entities';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsObject()
  @IsNotEmpty()
  name: Record<string, string>;

  @IsObject()
  @IsNotEmpty()
  description: Record<string, string>;

  @IsString()
  visible: string;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsArray()
  @IsOptional()
  pages?: Pages[]; // replace with PagesDto[] if you have one
}
