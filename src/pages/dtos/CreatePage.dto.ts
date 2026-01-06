import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

// Section DTO
export class SectionDto {
  @IsNumber()
  id: number;

  @IsObject()
  @IsNotEmpty()
  name: Record<string, string>;

  @IsBoolean()
  visible: boolean;

  @IsArray()
  components: any[];
}

// Pages DTO
export class CreatePageDto {
  @IsObject()
  @IsNotEmpty()
  name: Record<string, string>;

  @IsString()
  visibility: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}
