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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const questions_entity_1 = require("../../questions/entities/questions.entity");
const participant_entity_1 = require("../../participant/entities/participant.entity");
const quiz_enum_1 = require("../quiz.enum");
let QuizEntity = class QuizEntity {
};
exports.QuizEntity = QuizEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuizEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuizEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: quiz_enum_1.QuizStatus, default: quiz_enum_1.QuizStatus.UPCOMING }),
    __metadata("design:type", String)
], QuizEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QuizEntity.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QuizEntity.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, user => user.quizzes),
    __metadata("design:type", user_entity_1.UserEntity)
], QuizEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => questions_entity_1.QuestionEntity, question => question.quiz, { cascade: true }),
    __metadata("design:type", Array)
], QuizEntity.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participant_entity_1.ParticipantEntity, (participant) => participant.quiz),
    __metadata("design:type", Array)
], QuizEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizEntity.prototype, "streakBonus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "deletedAt", void 0);
exports.QuizEntity = QuizEntity = __decorate([
    (0, typeorm_1.Entity)()
], QuizEntity);
//# sourceMappingURL=quiz.entity.js.map