import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { AnswerEntity } from './entities/answer.entity';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    createAnswer(quizId: number, createAnswerDto: CreateAnswerDto, req: any): Promise<AnswerEntity | {}>;
    stationCreatedHandler(data: {
        answer: number;
        user: string;
    }, context: NatsStreamingContext): Promise<void>;
    getAnswer(id: number): Promise<AnswerEntity>;
}
