import { IsString, IsOptional } from 'class-validator';

// Custom HTML component DTO
export class CustomHtmlDto {
  @IsString()
  html: Record<string , string>;

  @IsString()
  @IsOptional()
  customClasses?: string; // optional CSS classes
}
