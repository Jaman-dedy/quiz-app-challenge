import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { QuizEntity } from '../../quizz/entities/quiz.entity';
import { OptionEntity } from '../../options/entities/options.entity'
import { AnswerEntity } from '../../answer/entities/answer.entity'


@Entity()
export class QuestionEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity;

  @OneToMany(() => OptionEntity, option => option.question, { cascade: true })
  options: OptionEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.question)
  answers: AnswerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
