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
exports.AnswerEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const questions_entity_1 = require("../../questions/entities/questions.entity");
const participant_entity_1 = require("../../participant/entities/participant.entity");
const options_entity_1 = require("../../options/entities/options.entity");
let AnswerEntity = class AnswerEntity extends entity_helper_1.EntityHelper {
};
exports.AnswerEntity = AnswerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AnswerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => participant_entity_1.ParticipantEntity, (participant) => participant.answers),
    __metadata("design:type", participant_entity_1.ParticipantEntity)
], AnswerEntity.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questions_entity_1.QuestionEntity, (question) => question.answers),
    __metadata("design:type", questions_entity_1.QuestionEntity)
], AnswerEntity.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => options_entity_1.OptionEntity, option => option.answers),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AnswerEntity.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AnswerEntity.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AnswerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AnswerEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AnswerEntity.prototype, "deletedAt", void 0);
exports.AnswerEntity = AnswerEntity = __decorate([
    (0, typeorm_1.Entity)()
], AnswerEntity);
//# sourceMappingURL=answer.entity.js.map