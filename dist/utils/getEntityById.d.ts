import { Repository, EntityTarget } from 'typeorm';
export declare function getEntityById<T>(entity: EntityTarget<T>, entityId: number, repository: Repository<T | any>): Promise<T>;
