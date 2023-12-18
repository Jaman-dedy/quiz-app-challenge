import { UserEntity } from '../../users/entities/user.entity';
import { QuestionEntity } from '../../questions/entities/questions.entity';
import { ParticipantEntity } from '../../participant/entities/participant.entity';
import { QuizStatus } from '../quiz.enum';
export declare class QuizEntity {
    id: number;
    title: string;
    status: QuizStatus;
    startTime: Date;
    endTime: Date;
    user: UserEntity;
    questions: QuestionEntity[];
    participants: ParticipantEntity[];
    streakBonus: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
