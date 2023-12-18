import { QuizService } from './quiz.service';
import { LeaderboardDto } from './dto/leaderboard.dto';
export declare class LeaderboardController {
    private readonly quizService;
    constructor(quizService: QuizService);
    getLeaderboard(): Promise<LeaderboardDto[] | {
        message: string;
    }>;
}
