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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_nats_streaming_transport_1 = require("@nestjs-plugins/nestjs-nats-streaming-transport");
const answer_entity_1 = require("./entities/answer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const participant_entity_1 = require("../participant/entities/participant.entity");
const questions_entity_1 = require("../questions/entities/questions.entity");
const options_entity_1 = require("../options/entities/options.entity");
const getEntityById_1 = require("../utils/getEntityById");
const events_enum_1 = require("../contants/events.enum");
let AnswerService = class AnswerService {
    constructor(answerRepository, userRepository, participantRepository, questionRepository, optionRepository, publisher) {
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
        this.participantRepository = participantRepository;
        this.questionRepository = questionRepository;
        this.optionRepository = optionRepository;
        this.publisher = publisher;
    }
    async createAnswer(createAnswerDto) {
        const { quizId, userId, questionId, selectedOption } = createAnswerDto;
        const participant = await this.participantRepository.findOne({ where: { user: { id: userId } } });
        if (!participant) {
            throw new common_1.NotFoundException(`Participant with ID ${userId} not found`);
        }
        const existingAnswer = await this.answerRepository.findOne({
            where: {
                participant: { user: { id: userId } },
                question: { id: questionId },
            },
        });
        if (existingAnswer) {
            throw new common_1.BadRequestException('User has already answered this question.');
        }
        const hasJoinedQuiz = await this.participantRepository.findOne({
            where: {
                user: { id: userId },
                quiz: { id: quizId },
            },
        });
        if (!hasJoinedQuiz) {
            throw new common_1.BadRequestException('The user has not joined this specific quiz');
        }
        const question = await (0, getEntityById_1.getEntityById)(questions_entity_1.QuestionEntity, questionId, this.questionRepository);
        const userOption = await (0, getEntityById_1.getEntityById)(options_entity_1.OptionEntity, selectedOption, this.optionRepository);
        const answer = this.answerRepository.create({
            participant,
            question,
            options: [userOption],
            score: this.calculateScore(selectedOption),
        });
        const savedAnswer = await this.answerRepository.save(answer);
        if (Array.isArray(userOption.answers)) {
            userOption.answers = [...userOption.answers, savedAnswer];
        }
        else {
            userOption.answers = [savedAnswer];
        }
        await this.optionRepository.save(userOption);
        this.publisher.emit(events_enum_1.Patterns.answerSubmitted, { answer: savedAnswer.id, user: userId }).subscribe(guid => {
            console.log(`*** Submitted answer by : ${savedAnswer.id},  By: ${userId} ***`);
        });
        return { confirmation: "You have successful submitted your answer" };
    }
    calculateScore(selectedOption) {
        return selectedOption === 1 ? 1 : 0;
    }
    async getAnswerById(id) {
        return this.answerRepository.findOne({ where: { id } });
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(answer_entity_1.AnswerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(participant_entity_1.ParticipantEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(questions_entity_1.QuestionEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(options_entity_1.OptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjs_nats_streaming_transport_1.Publisher])
], AnswerService);
//# sourceMappingURL=answer.service.js.map