import { Repository } from 'typeorm';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { AnswerEntity } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ParticipantEntity } from '../participant/entities/participant.entity';
import { QuestionEntity } from '../questions/entities/questions.entity';
import { OptionEntity } from '../options/entities/options.entity';
export declare class AnswerService {
    private readonly answerRepository;
    private readonly userRepository;
    private readonly participantRepository;
    private readonly questionRepository;
    private readonly optionRepository;
    private publisher;
    constructor(answerRepository: Repository<AnswerEntity | any>, userRepository: Repository<UserEntity>, participantRepository: Repository<ParticipantEntity>, questionRepository: Repository<QuestionEntity>, optionRepository: Repository<OptionEntity>, publisher: Publisher);
    createAnswer(createAnswerDto: CreateAnswerDto | any): Promise<AnswerEntity | {
        confirmation: string;
    }>;
    calculateScore(selectedOption: number): number;
    getAnswerById(id: number): Promise<AnswerEntity | undefined>;
}
