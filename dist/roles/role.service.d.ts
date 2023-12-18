import { Repository } from 'typeorm';
export declare class RoleService {
    private readonly repository;
    constructor(repository: Repository<any>);
    createRoleIfNotExists(roleEnum: number, roleName: string): Promise<void>;
}
