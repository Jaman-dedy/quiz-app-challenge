import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './entities/answer.entity';

import { UserEntity } from '../users/entities/user.entity';
import { ParticipantEntity } from '../participant/entities/participant.entity';
import { QuestionEntity } from '../questions/entities/questions.entity';
import { OptionEntity } from '../options/entities/options.entity';
import { natsStreamingTransport } from '../common/nats-config.ts'

@Module({
  imports: [
    natsStreamingTransport,
    TypeOrmModule.forFeature([AnswerEntity, QuestionEntity, OptionEntity, UserEntity, ParticipantEntity]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
