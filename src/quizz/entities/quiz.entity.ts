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
import { UserEntity } from '../../users/entities/user.entity'
import { QuestionEntity } from '../../questions/entities/questions.entity';
import { ParticipantEntity } from '../../participant/entities/participant.entity'
import { QuizStatus } from '../quiz.enum'

@Entity()
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: QuizStatus, default: QuizStatus.UPCOMING })
  status: QuizStatus;

  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @ManyToOne(() => UserEntity, user => user.quizzes)
  user: UserEntity;

  @OneToMany(() => QuestionEntity, question => question.quiz, { cascade: true })
  questions: QuestionEntity[];

  @OneToMany(() => ParticipantEntity, (participant) => participant.quiz)
  participants: ParticipantEntity[];

  @Column({ type: 'int', default: 0 })
  streakBonus: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
