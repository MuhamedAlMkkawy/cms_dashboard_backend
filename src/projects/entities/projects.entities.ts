import { ObjectId } from "mongodb";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projects {
  @PrimaryGeneratedColumn()
  id: ObjectId;

  @Column()
  icon : string
  
  @Column()
  title : string

  @Column()
  description : string
}