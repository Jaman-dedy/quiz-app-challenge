import { EntityHelper } from '../../utils/entity-helper';
import { Role } from '../../roles/entities/role.entity';
import { QuizEntity } from 'src/quizz/entities/quiz.entity';
import { ParticipantEntity } from '../../participant/entities/participant.entity';
export declare class UserEntity extends EntityHelper {
    id: number;
    email: string | null;
    password: string;
    previousPassword: string;
    loadPreviousPassword(): void;
    setPassword(): Promise<void>;
    username: string | null;
    role?: Role | null;
    quizzes: QuizEntity[];
    participants: ParticipantEntity[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
