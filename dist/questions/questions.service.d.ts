import { DeepPartial, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { QuestionEntity } from './entities/questions.entity';
export declare class QuestionService {
    private questionRepository;
    constructor(questionRepository: Repository<QuestionEntity>);
    createQuestion(createQuestionDto: CreateQuestionDto | any): Promise<QuestionEntity[]>;
    getAllQuestion(): Promise<QuestionEntity[]>;
    getQuestion(id: number | any): Promise<QuestionEntity>;
    update(id: QuestionEntity['id'], payload: DeepPartial<QuestionEntity>): Promise<QuestionEntity>;
}
