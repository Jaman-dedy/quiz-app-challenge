import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
import { NullableType } from '../utils/types/nullable.type';
import { QueryUserDto } from './dto/query-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createProfileDto: CreateUserDto): Promise<UserEntity>;
    findAll(query: QueryUserDto): Promise<InfinityPaginationResultType<UserEntity>>;
    findOne(id: string): Promise<NullableType<UserEntity>>;
    update(id: number, updateProfileDto: UpdateUserDto): Promise<UserEntity>;
}
