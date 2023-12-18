import { EntityHelper } from '../../utils/entity-helper';
import { QuestionEntity } from '../../questions/entities/questions.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';
export declare class OptionEntity extends EntityHelper {
    id: number;
    text: string;
    isCorrect: boolean;
    question: QuestionEntity;
    answers: AnswerEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
