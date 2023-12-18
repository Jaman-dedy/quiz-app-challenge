"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
class RoleService {
    constructor(repository) {
        this.repository = repository;
    }
    async createRoleIfNotExists(roleEnum, roleName) {
        const count = await this.repository.count({
            where: {
                id: roleEnum,
            },
        });
        if (!count) {
            const roleParams = {
                id: roleEnum,
                name: roleName,
            };
            await this.repository.save(this.repository.create(roleParams));
        }
    }
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map