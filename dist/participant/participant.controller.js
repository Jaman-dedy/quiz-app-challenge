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
exports.ParticipantController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const participant_service_1 = require("./participant.service");
const events_enum_1 = require("../contants/events.enum");
let ParticipantController = class ParticipantController {
    constructor(ParticipantService) {
        this.ParticipantService = ParticipantService;
    }
    async joinQuiz(quizId, req) {
        const userId = req.user.id;
        return await this.ParticipantService.joinQuiz({ quizId, userId, streak: 0 });
    }
    async stationCreatedHandler(data, context) {
        console.log(`-- New participant: ${data.participant}, joined the quiz : ${data.quiz} ---`);
        context.message.ack();
    }
};
exports.ParticipantController = ParticipantController;
__decorate([
    (0, common_1.Post)(":id/participate"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "joinQuiz", null);
__decorate([
    (0, microservices_1.EventPattern)(events_enum_1.Patterns.answerSubmitted),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, nestjs_nats_streaming_transport_1.NatsStreamingContext]),
    __metadata("design:returntype", Promise)
], ParticipantController.prototype, "stationCreatedHandler", null);
exports.ParticipantController = ParticipantController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Quiz'),
    (0, common_1.Controller)({
        path: 'quizzes',
        version: '1',
    }),
    __metadata("design:paramtypes", [participant_service_1.ParticipantService])
], ParticipantController);
//# sourceMappingURL=participant.controller.js.map