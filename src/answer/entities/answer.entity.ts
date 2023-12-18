import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';

import { QuestionEntity } from '../../questions/entities/questions.entity'
import { ParticipantEntity } from '../../participant/entities/participant.entity'
import { OptionEntity } from '../../options/entities/options.entity'

@Entity()
export class AnswerEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ParticipantEntity, (participant) => participant.answers)
  participant: ParticipantEntity;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;

  @ManyToMany(type => OptionEntity, option => option.answers)
  @JoinTable()
  options: OptionEntity[];

  @Column({ type: 'int', default: 0 })
  score: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
