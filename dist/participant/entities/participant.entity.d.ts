import { EntityHelper } from '../../utils/entity-helper';
import { QuizEntity } from '../../quizz/entities/quiz.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AnswerEntity } from '../../answer/entities/answer.entity';
export declare class ParticipantEntity extends EntityHelper {
    id: number;
    user: UserEntity;
    quiz: QuizEntity;
    answers: AnswerEntity[];
    streak: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
