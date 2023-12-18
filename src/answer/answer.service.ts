// answer.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { AnswerEntity } from './entities/answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UserEntity } from '../users/entities/user.entity'
import { ParticipantEntity } from '../participant/entities/participant.entity'
import { QuestionEntity } from '../questions/entities/questions.entity'
import { OptionEntity } from '../options/entities/options.entity'
import { getEntityById } from '../utils/getEntityById'

import { Patterns } from '../contants/events.enum'


@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity | any>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ParticipantEntity)
    private readonly participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
    // private publisher: Publisher
  ) { }

  async createAnswer(createAnswerDto: CreateAnswerDto | any): Promise<AnswerEntity | { confirmation: string }> {
    const { quizId, userId, questionId, selectedOption } = createAnswerDto;

    const participant = await this.participantRepository.findOne({ where: { user: { id: userId } } });

    if (!participant) {
      throw new NotFoundException(`Participant with ID ${userId} not found`);
    }

    const existingAnswer = await this.answerRepository.findOne({
      where: {
        participant: { user: { id: userId } },
        question: { id: questionId },
      },
    });
    if (existingAnswer) {
      throw new BadRequestException('User has already answered this question.');
    }
    // Check if the user has joined the quiz
    const hasJoinedQuiz = await this.participantRepository.findOne({
      where: {
        user: {id : userId},
        quiz: { id: quizId },
      },
    });

    if (!hasJoinedQuiz) {
      throw new BadRequestException('The user has not joined this specific quiz');
    }

    const question = await getEntityById(QuestionEntity, questionId, this.questionRepository);
    const userOption = await getEntityById(OptionEntity, selectedOption, this.optionRepository);

    const answer = this.answerRepository.create({
      participant,
      question,
      options: [userOption],
      score: this.calculateScore(selectedOption),
    });

    const savedAnswer = await this.answerRepository.save(answer);

    if (Array.isArray(userOption.answers)) {
      userOption.answers = [...userOption.answers, savedAnswer];
    } else {
      userOption.answers = [savedAnswer];
    }

    await this.optionRepository.save(userOption);

    // this.publisher.emit(Patterns.answerSubmitted, { answer: savedAnswer.id, user: userId }).subscribe(guid => {
    //   console.log(`*** Submitted answer by : ${savedAnswer.id},  By: ${userId} ***`)
    // })

    return { confirmation: "You have successful submitted your answer" };
  }


  calculateScore(selectedOption: number): number {
    return selectedOption === 1 ? 1 : 0;
  }

  async getAnswerById(id: number): Promise<AnswerEntity | undefined> {
    return this.answerRepository.findOne({ where: { id } });
  }
}
