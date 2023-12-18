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
exports.ParticipantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const participant_entity_1 = require("./entities/participant.entity");
const user_entity_1 = require("../users/entities/user.entity");
const quiz_entity_1 = require("../quizz/entities/quiz.entity");
const questions_entity_1 = require("../questions/entities/questions.entity");
const roles_enum_1 = require("../roles/roles.enum");
const events_enum_1 = require("../contants/events.enum");
let ParticipantService = class ParticipantService {
    constructor(participantRepository, userRepository, quizRepository, questionRepository, publisher) {
        this.participantRepository = participantRepository;
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.publisher = publisher;
    }
    async joinQuiz(data) {
        const { userId, quizId } = data;
        const existingParticipant = await this.participantRepository.findOne({
            where: { user: { id: userId }, quiz: { id: quizId } },
        });
        const quizCreator = await this.quizRepository.findOne({ where: { id: quizId, user: { id: userId } } });
        if (existingParticipant) {
            throw new common_1.ConflictException(`User with ID ${userId} has already joined the quiz with ID ${quizId}, please consider join other quizzes`);
        }
        if (quizCreator) {
            throw new common_1.ForbiddenException('You cannot join a quiz you have created.');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
        if (!quiz) {
            throw new common_1.NotFoundException(`Quiz with ID ${quizId} not found`);
        }
        const participant = new participant_entity_1.ParticipantEntity();
        participant.user = user;
        participant.quiz = quiz;
        await this.participantRepository.save(participant);
        const participantUser = await this.userRepository.findOne({ where: { id: userId } });
        participantUser.role = roles_enum_1.RoleEnum.participant;
        await this.userRepository.save(participantUser);
        this.publisher.emit(events_enum_1.Patterns.newParticipant, { participant: userId, quiz: quizId }).subscribe(guid => {
            console.log(`*** New participant : ${userId},  Has joined quiz: ${quizId} ***`);
        });
        const questions = await this.questionRepository.find({ where: { quiz: { id: quiz.id } } });
        return {
            confirmation: `Successfully joined the quiz with ID ${quizId}`,
            questions: questions,
        };
    }
};
exports.ParticipantService = ParticipantService;
exports.ParticipantService = ParticipantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(participant_entity_1.ParticipantEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(questions_entity_1.QuestionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_nats_streaming_transport_1.Publisher])
], ParticipantService);
//# sourceMappingURL=participant.service.js.map