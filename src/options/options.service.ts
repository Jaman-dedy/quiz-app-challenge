import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOptionsDto } from './dto/create-options.dto';
import { OptionEntity } from './entities/options.entity';


@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionsRepository: Repository<OptionEntity>,
  ) { }

  async createOptions(createOptionsDto: CreateOptionsDto | any): Promise<OptionEntity[]> {
    const options = this.optionsRepository.create(createOptionsDto);
    return this.optionsRepository.save(options);
  }

  getAllOptions(): Promise<OptionEntity[]> {
    return this.optionsRepository.find();
  }

  async getOption(id: number | any): Promise<OptionEntity> {
    const option = await this.optionsRepository.findOne(id);
    if (!option) {
      throw new NotFoundException(`Options with ID ${id} not found`);
    }
    return option;
  }

  update(id: OptionEntity['id'], payload: DeepPartial<OptionEntity>): Promise<OptionEntity> {
    return this.optionsRepository.save(
      this.optionsRepository.create({
        id,
        ...payload,
      }),
    );
  }

}
