import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  id_user: string;

  @IsOptional()
  @IsEnum(['ACTIVE', 'CHECKEDOUT', 'ABANDONED'], {
    message: 'Valid Status required.',
  })
  status?: 'ACTIVE'|'CHECKEDOUT'|'ABANDONED' ;

  @IsOptional()
  @IsDate()
  deleted_at;
}
