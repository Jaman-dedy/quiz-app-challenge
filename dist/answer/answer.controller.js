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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const microservices_1 = require("@nestjs/microservices");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const roles_guard_1 = require("../roles/roles.guard");
const roles_enum_1 = require("../roles/roles.enum");
const roles_decorator_1 = require("../roles/roles.decorator");
const answer_service_1 = require("./answer.service");
const create_answer_dto_1 = require("./dto/create-answer.dto");
const events_enum_1 = require("../contants/events.enum");
let AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    async createAnswer(quizId, createAnswerDto, req) {
        const userId = req.user.id;
        return this.answerService.createAnswer(Object.assign(Object.assign({}, createAnswerDto), { userId, quizId }));
    }
    async stationCreatedHandler(data, context) {
        console.log(`-- Received answer: ${data.answer}, Creator: ${data.user} ---`);
        context.message.ack();
    }
    async getAnswer(id) {
        const answer = await this.answerService.getAnswerById(id);
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        return answer;
    }
};
exports.AnswerController = AnswerController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.SerializeOptions)({
        groups: ['participant'],
    }),
    (0, common_1.Post)(':id/answer'),
    __param(0, (0, common_1.Param)('quizId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_answer_dto_1.CreateAnswerDto, Object]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "createAnswer", null);
__decorate([
    (0, microservices_1.EventPattern)(events_enum_1.Patterns.answerSubmitted),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, nestjs_nats_streaming_transport_1.NatsStreamingContext]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "stationCreatedHandler", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.SerializeOptions)({
        groups: ['participant'],
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAnswer", null);
exports.AnswerController = AnswerController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.participant),
    (0, common_1.Controller)({
        path: 'quizzes',
        version: '1',
    }),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map