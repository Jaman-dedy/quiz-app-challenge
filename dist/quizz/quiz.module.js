"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModule = void 0;
const common_1 = require("@nestjs/common");
const cron = __importStar(require("node-cron"));
const quiz_service_1 = require("./quiz.service");
const quiz_controller_1 = require("./quiz.controller");
const typeorm_1 = require("@nestjs/typeorm");
const quiz_entity_1 = require("./entities/quiz.entity");
const is_exists_validator_1 = require("../utils/validators/is-exists.validator");
const is_not_exists_validator_1 = require("../utils/validators/is-not-exists.validator");
const questions_entity_1 = require("../questions/entities/questions.entity");
const options_entity_1 = require("../options/entities/options.entity");
const user_entity_1 = require("../users/entities/user.entity");
const participant_entity_1 = require("../participant/entities/participant.entity");
const leaderboard_controller_1 = require("./leaderboard.controller");
const quiz_subscriber_service_1 = require("./quiz-subscriber.service");
const nats_config_ts_1 = require("../common/nats-config.ts");
let QuizModule = class QuizModule {
    constructor(quizService) {
        this.quizService = quizService;
        cron.schedule('0 * * * *', () => {
            quizService.updateQuizStatus();
        });
    }
};
exports.QuizModule = QuizModule;
exports.QuizModule = QuizModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nats_config_ts_1.natsStreamingTransport,
            typeorm_1.TypeOrmModule.forFeature([
                quiz_entity_1.QuizEntity,
                questions_entity_1.QuestionEntity,
                options_entity_1.OptionEntity,
                participant_entity_1.ParticipantEntity,
                user_entity_1.UserEntity
            ])
        ],
        controllers: [quiz_controller_1.QuizController, leaderboard_controller_1.LeaderboardController],
        providers: [is_exists_validator_1.IsExist, is_not_exists_validator_1.IsNotExist, quiz_service_1.QuizService, quiz_subscriber_service_1.QuizSubscriberService],
        exports: [quiz_service_1.QuizService],
    }),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizModule);
//# sourceMappingURL=quiz.module.js.map