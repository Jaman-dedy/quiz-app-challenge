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
exports.QuizController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const quiz_service_1 = require("./quiz.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const events_enum_1 = require("../contants/events.enum");
let QuizController = class QuizController {
    constructor(QuizService) {
        this.QuizService = QuizService;
    }
    async create(createQuizzDto, req) {
        const userId = req.user.id;
        const streakBonus = 5;
        return await this.QuizService.createAllQuiz(createQuizzDto, userId, streakBonus);
    }
    async stationCreatedHandler(data, context) {
        console.log(`-- Received quiz: ${data.quiz}, Creator: ${data.user} ---`);
        context.message.ack();
    }
    getAllQuizzes() {
        return this.QuizService.getAvailableQuizzes();
    }
    getQuiz(id) {
        try {
            return this.QuizService.getQuizWithDetails(id);
        }
        catch (error) {
            throw error;
        }
    }
    getQuizScore(quizId, req) {
        const participantId = req.user.id;
        try {
            return this.QuizService.getParticipantScoresInQuiz(participantId, quizId);
        }
        catch (error) {
            throw error;
        }
    }
    update(id, updateQuizDto) {
        return this.QuizService.update(id, updateQuizDto);
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "create", null);
__decorate([
    (0, microservices_1.EventPattern)(events_enum_1.Patterns.quizCreated),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, nestjs_nats_streaming_transport_1.NatsStreamingContext]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "stationCreatedHandler", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "getAllQuizzes", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "getQuiz", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.participant),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id/score'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], QuizController.prototype, "getQuizScore", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.SerializeOptions)({
        groups: ['creator'],
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "update", null);
exports.QuizController = QuizController = __decorate([
    (0, swagger_1.ApiTags)('Quiz'),
    (0, common_1.Controller)({
        path: 'quizzes',
        version: '1',
    }),
    __metadata("design:paramtypes", [quiz_service_1.QuizService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map