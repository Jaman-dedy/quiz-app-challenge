import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean
} from 'class-validator';


export class CreateOptionsDto {

  @ApiProperty({ example: 'React' })
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;
}
