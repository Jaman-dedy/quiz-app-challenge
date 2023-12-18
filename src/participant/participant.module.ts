import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantEntity } from './entities/participant.entity';
import { IsExist } from '../utils/validators/is-exists.validator';

import { UserEntity } from '../users/entities/user.entity';
import { QuizEntity } from '../quizz/entities/quiz.entity';
import {QuestionEntity} from '../questions/entities/questions.entity'
// import { natsStreamingTransport } from '../common/nats-config.ts'


@Module({
  imports: [
    TypeOrmModule.forFeature([ParticipantEntity, UserEntity, QuizEntity, QuestionEntity]),
],
  controllers: [ParticipantController],
  providers: [IsExist, IsNotExist, ParticipantService],
  // exports: [ParticipantService],
})
export class ParticipantModule {}
