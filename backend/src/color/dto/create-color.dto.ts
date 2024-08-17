import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  color_name: string;

  @IsString()
  @IsNotEmpty()
  color_code: string;
  
  @IsOptional()
  @IsDate()
  deleted_at: Date;
}
