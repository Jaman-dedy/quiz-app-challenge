import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { FilterUserDto, SortUserDto } from './dto/query-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    create(createProfileDto: CreateUserDto): Promise<UserEntity>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<UserEntity[]>;
    findOne(fields: EntityCondition<UserEntity>): Promise<NullableType<UserEntity>>;
    update(id: UserEntity['id'], payload: DeepPartial<UserEntity>): Promise<UserEntity>;
    softDelete(id: UserEntity['id']): Promise<void>;
}
