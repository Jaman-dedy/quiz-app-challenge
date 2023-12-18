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
exports.UpdateQuizDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_quiz_dto_1 = require("./create-quiz.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../../users/entities/user.entity");
const is_exists_validator_1 = require("../../utils/validators/is-exists.validator");
class UpdateQuizDto extends (0, swagger_1.PartialType)(create_quiz_dto_1.CreateQuizDto) {
}
exports.UpdateQuizDto = UpdateQuizDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'All about programming' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuizDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], UpdateQuizDto.prototype, "addQuestions", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], UpdateQuizDto.prototype, "removeQuestions", void 0);
__decorate([
    (0, swagger_2.ApiProperty)({ type: () => user_entity_1.UserEntity }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Validate)(is_exists_validator_1.IsExist, ['UserEntity', 'id'], {
        message: 'userExists',
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], UpdateQuizDto.prototype, "user", void 0);
//# sourceMappingURL=update-quiz.dto.js.map