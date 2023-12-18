import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { ParticipantService } from './participant.service';
export declare class ParticipantController {
    private readonly ParticipantService;
    constructor(ParticipantService: ParticipantService);
    joinQuiz(quizId: number, req: any): Promise<{
        confirmation: string;
        questions: import("../questions/entities/questions.entity").QuestionEntity[];
    }>;
    stationCreatedHandler(data: {
        participant: number;
        quiz: number;
    }, context: NatsStreamingContext): Promise<void>;
}
