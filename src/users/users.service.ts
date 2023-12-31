import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(createProfileDto: CreateUserDto): Promise<UserEntity> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }

  findOne(fields: EntityCondition<UserEntity>): Promise<NullableType<UserEntity>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  update(id: UserEntity['id'], payload: DeepPartial<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: UserEntity['id']): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
