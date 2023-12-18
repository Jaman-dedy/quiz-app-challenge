import { QuestionService } from './questions.service';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { UpdateQuestionDto } from './dto/update-questions.dto';
export declare class QuizController {
    private readonly QuestionService;
    constructor(QuestionService: QuestionService);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<import("./entities/questions.entity").QuestionEntity[]>;
    getAllQuestions(): Promise<import("./entities/questions.entity").QuestionEntity[]>;
    getQuestion(id: number): Promise<import("./entities/questions.entity").QuestionEntity>;
    update(id: number, updateQuestion: UpdateQuestionDto | any): Promise<import("./entities/questions.entity").QuestionEntity>;
}
