import { UserEntity } from '../../users/entities/user.entity';
import { CreateQuestionDto } from '../../questions/dto/create-questions.dto';
export declare class CreateQuizDto {
    title: string;
    user?: UserEntity;
    questions: CreateQuestionDto[];
    streakBonus: number;
}
