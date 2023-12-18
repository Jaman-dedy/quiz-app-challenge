"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const is_not_exists_validator_1 = require("../utils/validators/is-not-exists.validator");
const participant_service_1 = require("./participant.service");
const participant_controller_1 = require("./participant.controller");
const participant_entity_1 = require("./entities/participant.entity");
const is_exists_validator_1 = require("../utils/validators/is-exists.validator");
const user_entity_1 = require("../users/entities/user.entity");
const quiz_entity_1 = require("../quizz/entities/quiz.entity");
const questions_entity_1 = require("../questions/entities/questions.entity");
const nats_config_ts_1 = require("../common/nats-config.ts");
let ParticipantModule = class ParticipantModule {
};
exports.ParticipantModule = ParticipantModule;
exports.ParticipantModule = ParticipantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nats_config_ts_1.natsStreamingTransport,
            typeorm_1.TypeOrmModule.forFeature([participant_entity_1.ParticipantEntity, user_entity_1.UserEntity, quiz_entity_1.QuizEntity, questions_entity_1.QuestionEntity]),
        ],
        controllers: [participant_controller_1.ParticipantController],
        providers: [is_exists_validator_1.IsExist, is_not_exists_validator_1.IsNotExist, participant_service_1.ParticipantService],
    })
], ParticipantModule);
//# sourceMappingURL=participant.module.js.map