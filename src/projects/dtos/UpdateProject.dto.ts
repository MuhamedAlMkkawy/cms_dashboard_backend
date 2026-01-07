import {
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Pages } from 'src/pages/entities/pages.entities';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  logo?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  visible?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsArray()
  @IsOptional()
  pages?: Pages[];
}
