import { Module } from '@nestjs/common';
import { QuestionService } from './questions.service';
import { QuizController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entities/questions.entity';
import { IsExist } from '../utils/validators/is-exists.validator';
import { IsNotExist } from '../utils/validators/is-not-exists.validator';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuizController],
  providers: [IsExist, IsNotExist, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
