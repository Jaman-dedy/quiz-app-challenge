import { EntityHelper } from '../../utils/entity-helper';
import { QuestionEntity } from '../../questions/entities/questions.entity';
import { ParticipantEntity } from '../../participant/entities/participant.entity';
import { OptionEntity } from '../../options/entities/options.entity';
export declare class AnswerEntity extends EntityHelper {
    id: number;
    participant: ParticipantEntity;
    question: QuestionEntity;
    options: OptionEntity[];
    score: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
