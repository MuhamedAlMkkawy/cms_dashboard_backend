import { ObjectId } from "mongodb";
import { Pages } from "src/pages/entities/pages.entities";
import { Column, Entity , ManyToMany, ObjectIdColumn } from "typeorm";

@Entity()
export class Projects {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  icon : string

  @Column({ type: 'json' })
  title : {
    en : string,
    ar : string
  }

  @Column({ type: 'json' })
  description : {
    en : string,
    ar : string
  }

  @Column()
  pages : Pages[]
}