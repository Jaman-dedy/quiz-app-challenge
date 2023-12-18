import { Repository } from 'typeorm';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantEntity } from './entities/participant.entity';
import { UserEntity } from '../users/entities/user.entity';
import { QuizEntity } from '../quizz/entities/quiz.entity';
import { QuestionEntity } from '../questions/entities/questions.entity';
export declare class ParticipantService {
    private participantRepository;
    private userRepository;
    private quizRepository;
    private questionRepository;
    private publisher;
    constructor(participantRepository: Repository<ParticipantEntity>, userRepository: Repository<UserEntity>, quizRepository: Repository<QuizEntity>, questionRepository: Repository<QuestionEntity>, publisher: Publisher);
    joinQuiz(data: CreateParticipantDto): Promise<{
        confirmation: string;
        questions: QuestionEntity[];
    }>;
}
