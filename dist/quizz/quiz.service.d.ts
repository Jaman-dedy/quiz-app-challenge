import { DeepPartial, Repository } from 'typeorm';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { LeaderboardDto } from './dto/leaderboard.dto';
import { QuizEntity } from './entities/quiz.entity';
import { ParticipantEntity } from '../participant/entities/participant.entity';
import { UserEntity } from '../users/entities/user.entity';
export interface QuizScores {
    currentScore: number;
    streakScore: number;
}
export declare class QuizService {
    private quizRepository;
    private participantRepository;
    private userRepository;
    private publisher;
    constructor(quizRepository: Repository<QuizEntity>, participantRepository: Repository<ParticipantEntity>, userRepository: Repository<UserEntity>, publisher: Publisher);
    createAllQuiz(createQuizDto: CreateQuizDto, userId: number | any, streakBonus?: number): Promise<{
        quizID: number;
        confirmation: string;
    }>;
    getAvailableQuizzes(): Promise<QuizEntity[] | {}>;
    getQuizWithDetails(quizId: number): Promise<QuizEntity>;
    getParticipantScoresInQuiz(participantId: number | any, quizId: number): Promise<QuizScores>;
    getLeaderboard(): Promise<LeaderboardDto[] | {
        message: string;
    }>;
    updateQuizStatus(): Promise<void>;
    update(id: QuizEntity['id'], payload: DeepPartial<QuizEntity>): Promise<QuizEntity>;
}
