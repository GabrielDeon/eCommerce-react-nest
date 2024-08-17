import { CreateSizeDto } from './create-size.dto'
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSizeDto extends PartialType(CreateSizeDto) {}
