import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { QuizEntity } from '../../quizz/entities/quiz.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {AnswerEntity} from '../../answer/entities/answer.entity'

@Entity()
export class ParticipantEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => UserEntity, (user) => user.participants)
  user: UserEntity;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.participants)
  quiz: QuizEntity;

  @OneToMany(() => AnswerEntity, (answer) => answer.participant)
  answers: AnswerEntity[];

  @Column({ default: 0 })
  streak: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
