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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_transformer_1 = require("class-transformer");
const entity_helper_1 = require("../../utils/entity-helper");
const role_entity_1 = require("../../roles/entities/role.entity");
const quiz_entity_1 = require("../../quizz/entities/quiz.entity");
const participant_entity_1 = require("../../participant/entities/participant.entity");
let UserEntity = class UserEntity extends entity_helper_1.EntityHelper {
    loadPreviousPassword() {
        this.previousPassword = this.password;
    }
    async setPassword() {
        if (this.previousPassword !== this.password && this.password) {
            const salt = await bcryptjs_1.default.genSalt();
            this.password = await bcryptjs_1.default.hash(this.password, salt);
        }
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true, nullable: true }),
    (0, class_transformer_1.Expose)({ groups: ['me'] }),
    __metadata("design:type", Object)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "previousPassword", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "loadPreviousPassword", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "setPassword", null);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, {
        eager: true,
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => quiz_entity_1.QuizEntity, quiz => quiz.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "quizzes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => participant_entity_1.ParticipantEntity, (participant) => participant.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)()
], UserEntity);
//# sourceMappingURL=user.entity.js.map