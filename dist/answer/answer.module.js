"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const answer_controller_1 = require("./answer.controller");
const answer_service_1 = require("./answer.service");
const answer_entity_1 = require("./entities/answer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const participant_entity_1 = require("../participant/entities/participant.entity");
const questions_entity_1 = require("../questions/entities/questions.entity");
const options_entity_1 = require("../options/entities/options.entity");
const nats_config_ts_1 = require("../common/nats-config.ts");
let AnswerModule = class AnswerModule {
};
exports.AnswerModule = AnswerModule;
exports.AnswerModule = AnswerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nats_config_ts_1.natsStreamingTransport,
            typeorm_1.TypeOrmModule.forFeature([answer_entity_1.AnswerEntity, questions_entity_1.QuestionEntity, options_entity_1.OptionEntity, user_entity_1.UserEntity, participant_entity_1.ParticipantEntity]),
        ],
        controllers: [answer_controller_1.AnswerController],
        providers: [answer_service_1.AnswerService],
    })
], AnswerModule);
//# sourceMappingURL=answer.module.js.map