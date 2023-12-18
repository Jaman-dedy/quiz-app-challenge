import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber, IsOptional,
  
} from 'class-validator';



export class CreateParticipantDto {

  @ApiProperty({ example: '1' })
  readonly userId: number;

  @ApiProperty({ example: '2' })
  readonly quizId: number;

  @ApiProperty({ example: '3' })
  @IsNumber()
  @IsOptional()
  streak: number;
}
