import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';
export declare class QuizController {
    private readonly QuizService;
    constructor(QuizService: QuizService);
    create(createQuizzDto: CreateQuizDto, req: any): Promise<QuizEntity[] | any>;
    stationCreatedHandler(data: {
        quiz: number;
        user: string;
    }, context: NatsStreamingContext): Promise<void>;
    getAllQuizzes(): Promise<{} | QuizEntity[]>;
    getQuiz(id: number): Promise<QuizEntity>;
    getQuizScore(quizId: number, req: any): Promise<import("./quiz.service").QuizScores>;
    update(id: number, updateQuizDto: UpdateQuizDto | any): Promise<QuizEntity>;
}
