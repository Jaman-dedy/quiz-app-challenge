"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityById = void 0;
const common_1 = require("@nestjs/common");
async function getEntityById(entity, entityId, repository) {
    const entityInstance = await repository.findOne({ where: { id: entityId } });
    if (!entityInstance) {
        const entityName = entity instanceof Function ? entity.name : entity.constructor.name;
        throw new common_1.NotFoundException(`${entityName} with ID ${entityId} not found`);
    }
    return entityInstance;
}
exports.getEntityById = getEntityById;
//# sourceMappingURL=getEntityById.js.map