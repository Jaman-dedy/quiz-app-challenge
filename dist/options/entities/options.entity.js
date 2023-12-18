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
exports.OptionEntity = void 0;
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../../utils/entity-helper");
const questions_entity_1 = require("../../questions/entities/questions.entity");
const answer_entity_1 = require("../../answer/entities/answer.entity");
let OptionEntity = class OptionEntity extends entity_helper_1.EntityHelper {
};
exports.OptionEntity = OptionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OptionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], OptionEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], OptionEntity.prototype, "isCorrect", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questions_entity_1.QuestionEntity, (question) => question.options),
    __metadata("design:type", questions_entity_1.QuestionEntity)
], OptionEntity.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => answer_entity_1.AnswerEntity, answer => answer.options),
    __metadata("design:type", Array)
], OptionEntity.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OptionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OptionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], OptionEntity.prototype, "deletedAt", void 0);
exports.OptionEntity = OptionEntity = __decorate([
    (0, typeorm_1.Entity)()
], OptionEntity);
//# sourceMappingURL=options.entity.js.map