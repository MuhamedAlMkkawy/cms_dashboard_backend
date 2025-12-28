import { Expose } from "class-transformer"

export class ComponentResponce {
  @Expose()
  _id : string


  @Expose()
  type : string
  
  @Expose()
  label : string
  
  @Expose()
  icon : string 

  @Expose()
  visible : boolean
}