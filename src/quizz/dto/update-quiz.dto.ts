import { PartialType } from '@nestjs/swagger';
import { CreateQuizDto } from './create-quiz.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate, ArrayMinSize, IsString } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity'
import { IsExist } from '../../utils/validators/is-exists.validator';
import { CreateQuestionDto } from 'src/questions/dto/create-questions.dto';

export class UpdateQuizDto extends PartialType(CreateQuizDto) {
  @ApiProperty({ example: 'All about programming' })
  @IsOptional()
  title: string;

  @IsOptional()
  @ArrayMinSize(1)
  addQuestions?: CreateQuestionDto[];

  @IsOptional()
  @ArrayMinSize(1)
  removeQuestions?: number[];

  @ApiProperty({ type: () => UserEntity })
  @IsOptional()
  @Validate(IsExist, ['UserEntity', 'id'], {
    message: 'userExists',
  })
  user?: UserEntity;
}