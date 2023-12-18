import { Repository, EntityTarget } from 'typeorm';

interface RoleCreationParams {
  id: number;
  name: string;
}

export class RoleService {
  constructor(private readonly repository: Repository<any>) {}

  async createRoleIfNotExists(roleEnum: number, roleName: string): Promise<void> {
    const count = await this.repository.count({
      where: {
        id: roleEnum,
      },
    });

    if (!count) {
      const roleParams: RoleCreationParams = {
        id: roleEnum,
        name: roleName,
      };

      await this.repository.save(this.repository.create(roleParams));
    }
  }
}
