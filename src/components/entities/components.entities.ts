import { ObjectId } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Components{
  @ObjectIdColumn()
  _id : ObjectId

  @Column()
  type : string

  @Column()
  label : string

  @Column()
  icon : string;

  @Column()
  visible : string
}