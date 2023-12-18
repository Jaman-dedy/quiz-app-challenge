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
exports.RoleSeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../../../roles/entities/role.entity");
const roles_enum_1 = require("../../../roles/roles.enum");
const typeorm_2 = require("typeorm");
const role_service_1 = require("../../../roles/role.service");
let RoleSeedService = class RoleSeedService {
    constructor(repository) {
        this.repository = repository;
    }
    async run() {
        const roleService = new role_service_1.RoleService(this.repository);
        await roleService.createRoleIfNotExists(roles_enum_1.RoleEnum.user, 'user');
        await roleService.createRoleIfNotExists(roles_enum_1.RoleEnum.admin, 'admin');
        await roleService.createRoleIfNotExists(roles_enum_1.RoleEnum.creator, 'creator');
        await roleService.createRoleIfNotExists(roles_enum_1.RoleEnum.participant, 'participant');
    }
};
exports.RoleSeedService = RoleSeedService;
exports.RoleSeedService = RoleSeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleSeedService);
//# sourceMappingURL=role-seed.service.js.map