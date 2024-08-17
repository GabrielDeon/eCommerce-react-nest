import { IsString, IsEmail, IsNotEmpty, IsDate, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(["ADMIN" , "USER"], {message: "Valid role required."})
  role?: "ADMIN"|"USER";

  @IsOptional()
  @IsDate()
  deleted_at?: Date;
}