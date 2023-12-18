import { Repository, EntityTarget } from 'typeorm';
import {  NotFoundException } from '@nestjs/common';

export async function getEntityById<T>(
    entity: EntityTarget<T>,
    entityId: number,
    repository: Repository<T | any>,
): Promise<T> {
    const entityInstance = await repository.findOne({ where: { id: entityId } });

    if (!entityInstance) {
        const entityName = entity instanceof Function ? entity.name : entity.constructor.name;
        throw new NotFoundException(`${entityName} with ID ${entityId} not found`);
    }

    return entityInstance;
    
}


