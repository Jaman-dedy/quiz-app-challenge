"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionModule = void 0;
const common_1 = require("@nestjs/common");
const options_service_1 = require("./options.service");
const options_controller_1 = require("./options.controller");
const typeorm_1 = require("@nestjs/typeorm");
const options_entity_1 = require("./entities/options.entity");
const is_exists_validator_1 = require("../utils/validators/is-exists.validator");
const is_not_exists_validator_1 = require("../utils/validators/is-not-exists.validator");
let OptionModule = class OptionModule {
};
exports.OptionModule = OptionModule;
exports.OptionModule = OptionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([options_entity_1.OptionEntity])],
        controllers: [options_controller_1.OptionController],
        providers: [is_exists_validator_1.IsExist, is_not_exists_validator_1.IsNotExist, options_service_1.OptionsService],
        exports: [options_service_1.OptionsService],
    })
], OptionModule);
//# sourceMappingURL=options.module.js.map