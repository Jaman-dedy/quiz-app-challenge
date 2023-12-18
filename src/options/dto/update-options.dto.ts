import { PartialType } from '@nestjs/swagger';
import { CreateOptionsDto } from './create-options.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionsDto) {
  @ApiProperty({ example: 'Java' })
  @IsOptional()
  title: string;

  @ApiProperty({ type: () => Boolean })
  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}
