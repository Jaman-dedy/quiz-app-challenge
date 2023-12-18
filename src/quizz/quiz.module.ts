import { Module } from '@nestjs/common';
import * as cron from 'node-cron';

import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';
import { QuestionEntity } from '../questions/entities/questions.entity';
import { OptionEntity } from '../options/entities/options.entity';
import { UserEntity } from '../users/entities/user.entity'
import { ParticipantEntity } from '../participant/entities/participant.entity';
import { LeaderboardController } from './leaderboard.controller'
import { QuizSubscriberService } from './quiz-subscriber.service'
import { natsStreamingTransport } from '../common/nats-config.ts'

@Module({
  imports: [
    natsStreamingTransport,
    TypeOrmModule.forFeature(
      [
        QuizEntity,
        QuestionEntity,
        OptionEntity,
        ParticipantEntity,
        UserEntity
      ])],
  controllers: [QuizController, LeaderboardController],
  providers: [IsExist, IsNotExist, QuizService, QuizSubscriberService],
  exports: [QuizService],
})
export class QuizModule {
  constructor(private readonly quizService: QuizService) {
    // Run the updateQuizStatus method every hour
    cron.schedule('0 * * * *', () => {
      quizService.updateQuizStatus();
    });
  }
}
