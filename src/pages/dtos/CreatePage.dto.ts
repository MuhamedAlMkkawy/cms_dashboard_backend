import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

class LangObject {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}


export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  title : LangObject;

  @IsBoolean()
  @IsNotEmpty()
  visibility : boolean;

  @IsString()
  @IsNotEmpty()
  classes : string[];
}
    
