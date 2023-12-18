import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
} from 'class-validator';



export class UpdateParticipantDto {

  @ApiProperty({ example: '1' })
  readonly userId: number;

  @ApiProperty({ example: '2' })
  readonly quizId: number;

  @ApiProperty({ example: '3' })
  @IsNumber()
  streak: number;
}
