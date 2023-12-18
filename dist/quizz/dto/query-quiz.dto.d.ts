import { QuizEntity } from '../entities/quiz.entity';
import { UserEntity } from '../../users/entities/user.entity';
export declare class FilterQuizDto {
    user?: UserEntity[] | null;
}
export declare class SortQuizDto {
    orderBy: keyof QuizEntity;
    order: string;
}
export declare class QueryQuizDto {
    page: number;
    limit: number;
    filters?: FilterQuizDto | null;
    sort?: SortQuizDto[] | null;
}
