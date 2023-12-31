import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../../../roles/entities/role.entity';
import { RoleEnum } from '../../../roles/roles.enum';
import { Repository } from 'typeorm';
import { RoleService } from '../../../roles/role.service';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) {}

  async run() {
    const roleService = new RoleService(this.repository)
    await roleService.createRoleIfNotExists(RoleEnum.user, 'user');
    await roleService.createRoleIfNotExists(RoleEnum.admin, 'admin');
    await roleService.createRoleIfNotExists(RoleEnum.creator, 'creator');
    await roleService.createRoleIfNotExists(RoleEnum.participant, 'participant');

    // const countUser = await this.repository.count({
    //   where: {
    //     id: RoleEnum.user,
    //   },
    // });

    // if (!countUser) {
    //   await this.repository.save(
    //     this.repository.create({
    //       id: RoleEnum.user,
    //       name: 'user',
    //     }),
    //   );
    // }

    // const countAdmin = await this.repository.count({
    //   where: {
    //     id: RoleEnum.creator,
    //   },
    // });

    // if (!countAdmin) {
    //   await this.repository.save(
    //     this.repository.create({
    //       id: RoleEnum.creator,
    //       name: 'admin',
    //     }),
    //   );
    // }
  }
}
