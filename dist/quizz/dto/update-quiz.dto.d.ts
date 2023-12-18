import { CreateQuizDto } from './create-quiz.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateQuestionDto } from 'src/questions/dto/create-questions.dto';
declare const UpdateQuizDto_base: import("@nestjs/common").Type<Partial<CreateQuizDto>>;
export declare class UpdateQuizDto extends UpdateQuizDto_base {
    title: string;
    addQuestions?: CreateQuestionDto[];
    removeQuestions?: number[];
    user?: UserEntity;
}
export {};
