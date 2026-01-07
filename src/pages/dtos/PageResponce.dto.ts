import { Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Components } from 'src/components/entities/components.entities';

export class PageResponseDto {
  /* ================= Page ================= */

  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  language: string;

  @Expose()
  projectID: string;

  @Expose()
  visible: boolean;

  /* ================= Sections ================= */

  @Expose()
  @Type(() => SectionResponseDto)
  sections: SectionResponseDto[];
}

/* ================= Sections DTO ================= */

export class SectionResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  visible: boolean;

  /* ================= Components ================= */

  @Expose()
  components: any[];
}
