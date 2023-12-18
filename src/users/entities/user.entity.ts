import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';

import { EntityHelper } from '../../utils/entity-helper';
import { Role } from '../../roles/entities/role.entity';
import { QuizEntity } from '../../quizz/entities/quiz.entity';
import {ParticipantEntity} from '../../participant/entities/participant.entity'


@Entity()
export class UserEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Index()
  @Column({ type: String, nullable: true })
  username: string | null;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role?: Role | null;

  @OneToMany(() => QuizEntity, quiz => quiz.user)
  quizzes: QuizEntity[];

  @OneToMany(() => ParticipantEntity, (participant) => participant.user)
  participants: ParticipantEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
