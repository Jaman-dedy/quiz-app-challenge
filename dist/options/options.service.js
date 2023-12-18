"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const options_entity_1 = require("./entities/options.entity");
let OptionsService = class OptionsService {
    constructor(optionsRepository) {
        this.optionsRepository = optionsRepository;
    }
    async createOptions(createOptionsDto) {
        const options = this.optionsRepository.create(createOptionsDto);
        return this.optionsRepository.save(options);
    }
    getAllOptions() {
        return this.optionsRepository.find();
    }
    async getOption(id) {
        const option = await this.optionsRepository.findOne(id);
        if (!option) {
            throw new common_1.NotFoundException(`Options with ID ${id} not found`);
        }
        return option;
    }
    update(id, payload) {
        return this.optionsRepository.save(this.optionsRepository.create(Object.assign({ id }, payload)));
    }
};
exports.OptionsService = OptionsService;
exports.OptionsService = OptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(options_entity_1.OptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OptionsService);
//# sourceMappingURL=options.service.js.map