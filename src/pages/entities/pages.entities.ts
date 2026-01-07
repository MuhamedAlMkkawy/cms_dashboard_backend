import { ObjectId } from "mongodb";
import { Components } from "src/components/entities/components.entities";
import { Column, Entity, ObjectIdColumn } from "typeorm";


export interface Section {
  id: number;
  name: string;
  visible: boolean; // changed to boolean for clarity
  components: Components[];
}


@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'json' })
  name: string[];

  @Column()
  visible: string;

  @Column()
  projectID : string;

  @Column()
  language: string;

  @Column({ type: 'json' })
  sections: Section[];
}