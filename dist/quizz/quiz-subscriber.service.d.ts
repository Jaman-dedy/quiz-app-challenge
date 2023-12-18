import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
export declare class QuizSubscriberService {
    private publisher;
    constructor(publisher: Publisher);
    handleQuizCreatedEvent(data: {
        quizId: number;
    }): void;
    handleLiveParticipationEvent(data: {
        userId: number;
        quizId: number;
    }): void;
    handleScoreUpdateEvent(data: {
        userId: number;
        quizId: number;
        score: number;
    }): void;
}
