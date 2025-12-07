import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  title : {
    en : string;
    ar : string;
  }

  @Column()
  visibility : boolean;


  @Column()
  classes : string[];


  // @Column()
  // sections : string[];

}