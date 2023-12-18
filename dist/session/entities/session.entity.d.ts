import { UserEntity } from '../../users/entities/user.entity';
import { EntityHelper } from '../../utils/entity-helper';
export declare class Session extends EntityHelper {
    id: number;
    user: UserEntity;
    createdAt: Date;
    deletedAt: Date;
}
