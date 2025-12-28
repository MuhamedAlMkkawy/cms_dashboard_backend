import { IsNotEmpty, IsString } from "class-validator";

export class CreateComponentDto {
  @IsString()
  @IsNotEmpty()
  type : string
  
  
  @IsString()
  @IsNotEmpty()
  label : string
  
  @IsString()
  @IsNotEmpty()
  icon : string 
  
  @IsString()
  @IsNotEmpty()
  visible : string
}