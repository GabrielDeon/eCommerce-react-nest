import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBillDto {
  @IsString()
  @IsNotEmpty()
  id_cart: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsString()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  zip_code: string;

  @IsString()
  @IsNotEmpty()
  country_region: string;

  @IsString()
  @IsNotEmpty()
  street_address: string;

  @IsString()
  @IsNotEmpty()
  city_town: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsString()
  @IsNotEmpty()
  address_line_2: string;

  @IsString()
  @IsNotEmpty()
  email_address: string;

  @IsDate()
  @IsOptional()
  deleted_at: Date;
}
