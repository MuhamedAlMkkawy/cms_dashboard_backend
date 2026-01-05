import { ObjectId } from "mongodb";
import { Pages } from "src/pages/entities/pages.entities";
import { Column, Entity , ObjectIdColumn } from "typeorm";

@Entity()
export class Projects {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  logo : string

  @Column({ type: 'json' })
  name : Record<string, string>;

  @Column({ type: 'json' })
  description: Record<string, string>;

  @Column()
  visible : boolean

  @Column()
  languages : string[]

  @Column()
  pages : Pages[]
}