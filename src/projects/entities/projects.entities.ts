import { ObjectId } from "mongodb";
import { Pages } from "src/pages/entities/pages.entities";
import { Column, Entity , ObjectIdColumn } from "typeorm";

@Entity()
export class Projects {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  logo : string

  @Column()
  name : string;

  @Column()
  description: string;

  @Column()
  visible : string

  @Column()
  languages : string[]

  @Column()
  pages : Pages[]
}