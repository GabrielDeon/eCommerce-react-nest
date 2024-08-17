import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty()
  size_name: string;  

  @IsOptional()
  @IsDate()
  deleted_at?: Date;
}