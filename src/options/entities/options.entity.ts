import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { QuestionEntity } from '../../questions/entities/questions.entity';
import {AnswerEntity} from '../../answer/entities/answer.entity'

@Entity()
export class OptionEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String})
  text: string;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  question: QuestionEntity;


  @ManyToMany(type => AnswerEntity, answer => answer.options)
  answers: AnswerEntity[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
