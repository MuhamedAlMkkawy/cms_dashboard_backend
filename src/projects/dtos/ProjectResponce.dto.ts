import { Expose, Transform } from 'class-transformer';
import { PageResponseDto } from 'src/pages/dtos/PageResponce.dto';
// import { PagesResponseDto } from 'src/pages/dto/pages-response.dto';

export class ProjectResponseDto {
  @Expose()
  _id: string;
  
  @Expose()
  logo: string;
  
  @Expose()
  @Transform(({ value }) =>
    typeof value === 'object' ? null : value,
  )
  
  name: string;
  
  @Expose()
  @Transform(({ value }) =>
    typeof value === 'object' ? null : value,
  )
  description: string;
  
  @Expose()
  visible: boolean;
  
  @Expose()
  languages: string[];
  
  @Expose()
  pages: any[];
}
