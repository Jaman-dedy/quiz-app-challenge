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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_enum_1 = require("../roles/roles.enum");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../roles/roles.guard");
const infinity_pagination_1 = require("../utils/infinity-pagination");
const query_user_dto_1 = require("./dto/query-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createProfileDto) {
        return this.usersService.create(createProfileDto);
    }
    async findAll(query) {
        var _a, _b;
        const page = (_a = query === null || query === void 0 ? void 0 : query.page) !== null && _a !== void 0 ? _a : 1;
        let limit = (_b = query === null || query === void 0 ? void 0 : query.limit) !== null && _b !== void 0 ? _b : 10;
        if (limit > 50) {
            limit = 50;
        }
        return (0, infinity_pagination_1.infinityPagination)(await this.usersService.findManyWithPagination({
            filterOptions: query === null || query === void 0 ? void 0 : query.filters,
            sortOptions: query === null || query === void 0 ? void 0 : query.sort,
            paginationOptions: {
                page,
                limit,
            },
        }), { page, limit });
    }
    findOne(id) {
        return this.usersService.findOne({ id: +id });
    }
    update(id, updateProfileDto) {
        return this.usersService.update(id, updateProfileDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ['admin'],
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ['admin'],
    }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_user_dto_1.QueryUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ['admin'],
    }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.SerializeOptions)({
        groups: ['admin'],
    }),
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.admin),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)({
        path: 'users',
        version: '1',
    }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map