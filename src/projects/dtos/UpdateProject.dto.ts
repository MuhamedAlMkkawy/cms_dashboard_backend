import { IsOptional } from "class-validator"

export class UpdateProjectDto {
  @IsOptional()
  icon : string
  
  @IsOptional()
  title : {
    en : string,
    ar : string
  }
  
  @IsOptional()
  description : {
    en : string,
    ar : string
  }
}