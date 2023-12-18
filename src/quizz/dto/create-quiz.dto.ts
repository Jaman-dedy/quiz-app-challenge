import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  ArrayMinSize,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '../../users/entities/user.entity'
import { CreateQuestionDto } from '../../questions/dto/create-questions.dto';

export class CreateQuizDto {

  @ApiProperty({ example: 'All about programming' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: UserEntity })
  user?: UserEntity;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];

  @IsNumber()
  @IsOptional()
  streakBonus: number;
}
