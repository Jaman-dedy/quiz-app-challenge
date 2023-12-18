import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  ArrayMinSize,
  IsString,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

import {CreateOptionsDto} from '../../options/dto/create-options.dto'

export class CreateQuestionDto {

  @ApiProperty({ example: 'All about programming' })
  @IsString()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionsDto)
  options: CreateOptionsDto[];
}
