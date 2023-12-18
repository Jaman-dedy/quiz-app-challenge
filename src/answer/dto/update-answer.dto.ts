import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateAnswerDto {
  
  @IsNumber()
  @IsNotEmpty()
  questionId: number; 

  @IsArray()
  @IsNotEmpty()
  selectedOption: number;
  
  @IsNumber()
  score: number;
}
