import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name : string

  @Column()
  project_id : number

  @Column()
  title : {
    en : string;
    ar : string;
  }

  @Column()
  visibility : boolean;

  @Column()
  slug : string

  @Column()
  sections: any[];
}