import { FindOptions } from 'src/utils/types/find-options.type';
import { DeepPartial, Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { NullableType } from '../utils/types/nullable.type';
import { UserEntity } from 'src/users/entities/user.entity';
export declare class SessionService {
    private readonly sessionRepository;
    constructor(sessionRepository: Repository<Session>);
    findOne(options: FindOptions<Session>): Promise<NullableType<Session>>;
    findMany(options: FindOptions<Session>): Promise<Session[]>;
    create(data: DeepPartial<Session>): Promise<Session>;
    softDelete({ excludeId, ...criteria }: {
        id?: Session['id'];
        user?: Pick<UserEntity, 'id'>;
        excludeId?: Session['id'];
    }): Promise<void>;
}
