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
exports.QuestionEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const quiz_entity_1 = require("../../quizz/entities/quiz.entity");
const options_entity_1 = require("../../options/entities/options.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
let QuestionEntity = class QuestionEntity extends entity_helper_1.EntityHelper {
};
exports.QuestionEntity = QuestionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => quiz_entity_1.QuizEntity, (quiz) => quiz.questions),
    __metadata("design:type", quiz_entity_1.QuizEntity)
], QuestionEntity.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => options_entity_1.OptionEntity, option => option.question, { cascade: true }),
    __metadata("design:type", Array)
], QuestionEntity.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.AnswerEntity, (answer) => answer.question),
    __metadata("design:type", Array)
], QuestionEntity.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuestionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuestionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], QuestionEntity.prototype, "deletedAt", void 0);
exports.QuestionEntity = QuestionEntity = __decorate([
    (0, typeorm_1.Entity)()
], QuestionEntity);
//# sourceMappingURL=questions.entity.js.map