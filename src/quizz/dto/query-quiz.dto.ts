import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { QuizEntity } from '../entities/quiz.entity';
import { UserEntity } from '../../users/entities/user.entity'

export class FilterQuizDto {
  @ApiProperty({ type: UserEntity })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserEntity)
  user?: UserEntity[] | null;
}

export class SortQuizDto {
  @ApiProperty()
  @IsString()
  orderBy: keyof QuizEntity;

  @ApiProperty()
  @IsString()
  order: string;
}

export class QueryQuizDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit: number;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterQuizDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterQuizDto)
  filters?: FilterQuizDto | null;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortQuizDto, JSON.parse(value)) : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortQuizDto)
  sort?: SortQuizDto[] | null;
}
