import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsObject,
  IsOptional,
} from 'class-validator';
import { Pages } from 'src/pages/entities/pages.entities';

export class CreateProjectDto {
  @IsNotEmpty()
  logo: string;

  @IsObject()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  description: string;

  // @IsString()
  // visible: string;

  @IsArray()
  languages: string[];

  @IsArray()
  @IsOptional()
  pages?: Pages[]; // replace with PagesDto[] if you have one
}
