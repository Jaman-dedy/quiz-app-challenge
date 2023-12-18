import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class CreateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number; 

  @IsNumber()
  @IsNotEmpty()
  selectedOption: number; 

  @IsNumber()
  @IsOptional()
  score: number;
}
