import { PartialType } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-questions.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, ArrayMinSize, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateOptionDto } from '../../options/dto/update-options.dto';

export class UpdateQuestionDto  {
  @ApiProperty({ example: 'All about programming' })
  @IsOptional()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOptionDto)
  options: UpdateOptionDto[];
}
