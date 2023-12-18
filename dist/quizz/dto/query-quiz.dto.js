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
exports.QueryQuizDto = exports.SortQuizDto = exports.FilterQuizDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("../../users/entities/user.entity");
class FilterQuizDto {
}
exports.FilterQuizDto = FilterQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_entity_1.UserEntity }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => user_entity_1.UserEntity),
    __metadata("design:type", Object)
], FilterQuizDto.prototype, "user", void 0);
class SortQuizDto {
}
exports.SortQuizDto = SortQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], SortQuizDto.prototype, "orderBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SortQuizDto.prototype, "order", void 0);
class QueryQuizDto {
}
exports.QueryQuizDto = QueryQuizDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : 1)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryQuizDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
    }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? Number(value) : 10)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], QueryQuizDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value ? (0, class_transformer_1.plainToInstance)(FilterQuizDto, JSON.parse(value)) : undefined),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => FilterQuizDto),
    __metadata("design:type", Object)
], QueryQuizDto.prototype, "filters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        return value ? (0, class_transformer_1.plainToInstance)(SortQuizDto, JSON.parse(value)) : undefined;
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SortQuizDto),
    __metadata("design:type", Object)
], QueryQuizDto.prototype, "sort", void 0);
//# sourceMappingURL=query-quiz.dto.js.map