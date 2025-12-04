import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

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
}