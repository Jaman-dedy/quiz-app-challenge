import { OptionsService } from './options.service';
import { CreateOptionsDto } from './dto/create-options.dto';
import { UpdateOptionDto } from './dto/update-options.dto';
export declare class OptionController {
    private readonly OptionsService;
    constructor(OptionsService: OptionsService);
    createOptions(createOptionsDto: CreateOptionsDto): Promise<import("./entities/options.entity").OptionEntity[]>;
    getAllOptions(): () => Promise<import("./entities/options.entity").OptionEntity[]>;
    getOption(id: number): Promise<import("./entities/options.entity").OptionEntity>;
    update(id: number, updateOption: UpdateOptionDto | any): Promise<import("./entities/options.entity").OptionEntity>;
}
