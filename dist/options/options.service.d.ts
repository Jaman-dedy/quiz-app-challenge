import { DeepPartial, Repository } from 'typeorm';
import { CreateOptionsDto } from './dto/create-options.dto';
import { OptionEntity } from './entities/options.entity';
export declare class OptionsService {
    private optionsRepository;
    constructor(optionsRepository: Repository<OptionEntity>);
    createOptions(createOptionsDto: CreateOptionsDto | any): Promise<OptionEntity[]>;
    getAllOptions(): Promise<OptionEntity[]>;
    getOption(id: number | any): Promise<OptionEntity>;
    update(id: OptionEntity['id'], payload: DeepPartial<OptionEntity>): Promise<OptionEntity>;
}
