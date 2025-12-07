import { Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

class TitleDto {
  @Expose()
  en: string;

  @Expose()
  ar: string;
}

export class PageResponseDto {
  @Expose()
  _id: ObjectId;

  @Expose()
  @Type(() => TitleDto)
  title: TitleDto;

  @Expose()
  visibility: boolean;

  @Expose()
  classes: string[];
}
