import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantEntity } from './entities/participant.entity';
import { UserEntity } from '../users/entities/user.entity';
import { QuizEntity } from '../quizz/entities/quiz.entity';
import { QuestionEntity } from '../questions/entities/questions.entity';
import { RoleEnum } from '../roles/roles.enum';

import { Patterns } from '../contants/events.enum'

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
    // private publisher: Publisher
  ) { }

  async joinQuiz(data: CreateParticipantDto): Promise<{ confirmation: string; questions: QuestionEntity[] }> {
    const { userId, quizId } = data;

    const existingParticipant = await this.participantRepository.findOne({
      where: { user: { id: userId }, quiz: { id: quizId } },
    });
   
     // Check if the user is the creator of the quiz
    const quizCreator = await this.quizRepository.findOne({ where: { id: quizId, user: {id: userId} } });

    if (existingParticipant) {
      throw new ConflictException(`User with ID ${userId} has already joined the quiz with ID ${quizId}, please consider join other quizzes`);
    }
    if (quizCreator) {
      throw new ForbiddenException('You cannot join a quiz you have created.');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    const participant = new ParticipantEntity();
    participant.user = user!;
    participant.quiz = quiz;

    await this.participantRepository.save(participant);

    // Update user role to participant 
    const participantUser: any = await this.userRepository.findOne({where: {id : userId}});
    participantUser.role = RoleEnum.participant
    await this.userRepository.save(participantUser);

    // this.publisher.emit(Patterns.newParticipant, { participant: userId, quiz: quizId }).subscribe(guid => {
    //   console.log(`*** New participant : ${userId},  Has joined quiz: ${quizId} ***`)
    // })

    const questions = await this.questionRepository.find({ where: { quiz: {id: quiz.id} } });

    return {
      confirmation: `Successfully joined the quiz with ID ${quizId}`,
      questions: questions,
    };
  }

}
