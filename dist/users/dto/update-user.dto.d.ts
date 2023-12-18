import { CreateUserDto } from './create-user.dto';
import { Role } from '../../roles/entities/role.entity';
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    email?: string | null;
    password?: string;
    username?: string;
    role?: Role | null;
    hash?: string | null;
}
export {};
