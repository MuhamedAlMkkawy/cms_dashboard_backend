import { ObjectId } from "mongodb";
import { Components } from "src/components/entities/components.entities";
import { Column, Entity, ObjectIdColumn } from "typeorm";


export interface Section {
  id: number;
  name: Record<string, string>;
  visible: boolean; // changed to boolean for clarity
  components: Components[];
}


@Entity()
export class Pages {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  pageId: string;

  
  @Column({ type: 'json' })
  name: Record<string, string>;

  @Column()
  visible: string;

  @Column({ type: 'json' })
  sections: Section[];
}