import { IsOptional, IsString } from "class-validator";

export class UpdateComponentDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  label: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsString()
  @IsOptional()
  visible: string;
}