import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsDate()
    deleted_at?: Date;
}