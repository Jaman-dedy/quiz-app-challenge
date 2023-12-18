"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModule = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const questions_controller_1 = require("./questions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const questions_entity_1 = require("./entities/questions.entity");
const is_exists_validator_1 = require("../utils/validators/is-exists.validator");
const is_not_exists_validator_1 = require("../utils/validators/is-not-exists.validator");
let QuestionModule = class QuestionModule {
};
exports.QuestionModule = QuestionModule;
exports.QuestionModule = QuestionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([questions_entity_1.QuestionEntity])],
        controllers: [questions_controller_1.QuizController],
        providers: [is_exists_validator_1.IsExist, is_not_exists_validator_1.IsNotExist, questions_service_1.QuestionService],
        exports: [questions_service_1.QuestionService],
    })
], QuestionModule);
//# sourceMappingURL=questions.module.js.map