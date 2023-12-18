import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-questions.dto';
import { QuestionEntity } from './entities/questions.entity';


@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) { }

  createQuestion(createQuestionDto: CreateQuestionDto | any): Promise<QuestionEntity[]> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  getAllQuestion(): Promise<QuestionEntity[]> {
    return this.questionRepository.find();
  }

  async getQuestion(id: number | any): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  update(id: QuestionEntity['id'], payload: DeepPartial<QuestionEntity>): Promise<QuestionEntity> {
    return this.questionRepository.save(
      this.questionRepository.create({
        id,
        ...payload,
      }),
    );
  }

}
