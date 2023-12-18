import { EntityHelper } from '../../utils/entity-helper';
import { QuizEntity } from '../../quizz/entities/quiz.entity';
import { OptionEntity } from '../../options/entities/options.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';
export declare class QuestionEntity extends EntityHelper {
    id: number;
    text: string;
    quiz: QuizEntity;
    options: OptionEntity[];
    answers: AnswerEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
