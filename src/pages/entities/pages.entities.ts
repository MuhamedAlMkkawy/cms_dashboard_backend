import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pages {
  @PrimaryGeneratedColumn()
  _id: number;

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