import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, EntityManager, LessThanOrEqual, MoreThanOrEqual, In } from 'typeorm';
import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { CreateQuizDto } from './dto/create-quiz.dto';
import { LeaderboardDto } from './dto/leaderboard.dto'

import { QuizEntity } from './entities/quiz.entity';
import { QuestionEntity } from '../questions/entities/questions.entity';
import { OptionEntity } from '../options/entities/options.entity';
import { ParticipantEntity } from '../participant/entities/participant.entity';
import { UserEntity } from '../users/entities/user.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { QuizStatus } from './quiz.enum'
import { Patterns } from '../contants/events.enum'


export interface QuizScores {
  currentScore: number;
  streakScore: number;
}


@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    @InjectRepository(ParticipantEntity)
    private participantRepository: Repository<ParticipantEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private publisher: Publisher
  ) { }


  async createAllQuiz(createQuizDto: CreateQuizDto, userId: number | any, streakBonus: number = 5): Promise<{ quizID: number, confirmation: string }> {
    const { title, questions } = createQuizDto;

    const quiz = this.quizRepository.create({
      title,
      status: QuizStatus.ONGOING,
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600 * 1000), // the quiz will end in 1 hour
      user: userId,
      streakBonus,
    });

    return this.quizRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
      const savedQuiz = await transactionalEntityManager.save(quiz);

      const savedQuestions = await Promise.all(
        questions.map(async (questionDto) => {
          const { text, options } = questionDto;

          const question = transactionalEntityManager.create(QuestionEntity, { text, quiz: savedQuiz });

          const savedQuestion = await transactionalEntityManager.save(question);

          const savedOptions = await Promise.all(
            options.map((optionDto) => {
              const option = transactionalEntityManager.create(OptionEntity, { ...optionDto, question: savedQuestion });
              return transactionalEntityManager.save(option);
            })
          );

          savedQuestion.options = savedOptions;

          return savedQuestion;
        })
      );
      savedQuiz.questions = savedQuestions;
      const creatorUser: any = await this.userRepository.findOne({ where: { id: userId } });

      if (!creatorUser) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      creatorUser.role = RoleEnum.creator;
      await this.userRepository.save(creatorUser);

      this.publisher.emit(Patterns.quizCreated, { quiz: savedQuiz.id, user: creatorUser.username }).subscribe(guid => {
        console.log(`*** Published quiz : ${savedQuiz.id},  Creator: ${creatorUser.username} ***`)
      })

      return { quizID: savedQuiz.id, confirmation: "Quiz created successfully" }
    });
  }


  async getAvailableQuizzes(): Promise<QuizEntity[] | {}> {
    const currentDate = new Date();

    // Fetch quizzes that are ongoing or upcoming
    const quizzes = await this.quizRepository.find({
      where: {
        status: In([QuizStatus.UPCOMING, QuizStatus.ONGOING]),
        startTime: LessThanOrEqual(currentDate),
        endTime: MoreThanOrEqual(currentDate),
      },
    });

    if (quizzes.length === 0) {
      return { message: 'No available quiz at the moment.' };
    }

    return quizzes;
  }

  async getQuizWithDetails(quizId: number): Promise<QuizEntity> {
    const quiz = await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.options', 'options')
      .where('quiz.id = :quizId', { quizId })
      .getOne();

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${quizId} not found`);
    }

    return quiz;
  }

  async getParticipantScoresInQuiz(participantId: number | any, quizId: number): Promise<QuizScores> {
    const participant = await this.participantRepository.findOne({
      where: { user: { id: participantId } },
      relations: ['answers', 'answers.options', 'answers.question', 'answers.question.quiz'],
    });

    if (!participant) {
      return { currentScore: 0, streakScore: 0 };
    }

    const quizAnswers = participant.answers.filter(answer => answer.question && answer.question.quiz && answer.question.quiz.id === quizId);

    const scores = quizAnswers.reduce((result, answer) => {
      const answerScore = answer.score || 0;
      const isCorrect = answer.options.some(option => option.isCorrect);
      const streakBonus = isCorrect ? (answer.question.quiz.streakBonus || 0) : 0;

      participant.streak = isCorrect ? participant.streak + 1 : 0;

      const currentAnswerBonus = isCorrect ? participant.streak * streakBonus : 0;
      const totalAnswerScore = answerScore + currentAnswerBonus;
      result.currentScore += answerScore;
      result.streakScore += totalAnswerScore;

      return result;
    }, { currentScore: 0, streakScore: 0 });

    return scores;
  }


  async getLeaderboard(): Promise<LeaderboardDto[] | { message: string }> {
    const leaderboard = await this.participantRepository
      .createQueryBuilder('participant')
      .leftJoinAndSelect('participant.answers', 'answer')
      .leftJoinAndSelect('participant.user', 'user')
      .leftJoinAndSelect('answer.question', 'question')
      .getMany();

    // Group answers by participant and calculate total score
    const groupedLeaderboard = leaderboard.reduce((acc, participant) => {
      const participantId = participant.id;
      const username = participant.user.username ? participant.user.username : 'Unknown';

      if (!acc[participantId]) {
        acc[participantId] = { participantId, username, score: 0 };
      }

      acc[participantId].score += participant.answers.reduce((sum, answer) => sum + (answer.score || 0), 0);

      return acc;
    }, {} as Record<number, LeaderboardDto>);

    const leaderboardDto = Object.values(groupedLeaderboard);
    leaderboardDto.sort((a, b) => b.score - a.score);

    if (leaderboardDto.length === 0) {
      return { message: "No data available for now" }
    }
    return leaderboardDto;
  }

  async updateQuizStatus(): Promise<void> {
    const currentDate = new Date();
    const quizzesToUpdate = await this.quizRepository.find({
      where: {
        status: QuizStatus.UPCOMING,
        startTime: LessThanOrEqual(currentDate),
      },
    });
    await Promise.all(
      quizzesToUpdate.map(async (quiz) => {
        quiz.status = QuizStatus.ONGOING;
        await this.quizRepository.save(quiz);
      }),
    );
    const completedQuizzes = await this.quizRepository.find({
      where: {
        status: QuizStatus.ONGOING,
        endTime: LessThanOrEqual(currentDate),
      },
    });

    await Promise.all(
      completedQuizzes.map(async (quiz) => {
        quiz.status = QuizStatus.COMPLETED;
        await this.quizRepository.save(quiz);
      }),
    );
  }

  update(id: QuizEntity['id'], payload: DeepPartial<QuizEntity>): Promise<QuizEntity> {
    return this.quizRepository.save(
      this.quizRepository.create({
        id,
        ...payload,
      }),
    );
  }

}
