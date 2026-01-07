import { ComponentResponce } from '../../components/dtos/ComponentResponce.dto';
import { Expose, Type, Transform } from 'class-transformer';

export class SectionResponseDto {
  @Expose()
  id: string | number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value === 'true' || value === true)
  visible: boolean;

  @Expose()
  @Type(() => ComponentResponce)
  components: ComponentResponce[];
}

export class PageResponseDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value === 'true' || value === true)
  visible: boolean;

  @Expose()
  projectID: string;

  @Expose()
  language: string;

  @Expose()
  @Type(() => SectionResponseDto)
  sections: SectionResponseDto[];
}

export class ProjectResponseDto {
  @Expose()
  _id: string;

  @Expose()
  logo: string;

  @Expose()
  name: string;

  @Expose() 
  description: string;

  @Expose()
  @Transform(({ value }) => value === 'true' || value === true)
  visible: boolean;

  @Expose()
  languages: string[];

  @Expose()
  @Type(() => PageResponseDto)
  pages: PageResponseDto[];
}
