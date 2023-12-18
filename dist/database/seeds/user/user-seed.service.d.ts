import { UserEntity } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserSeedService {
    private repository;
    constructor(repository: Repository<UserEntity>);
    run(): Promise<void>;
}
