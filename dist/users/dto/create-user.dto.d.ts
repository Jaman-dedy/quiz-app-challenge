import { Role } from '../../roles/entities/role.entity';
export declare class CreateUserDto {
    email: string | null;
    password?: string;
    username: string;
    role?: Role | null;
    hash?: string | null;
}
