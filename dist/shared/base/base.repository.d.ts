import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
export declare abstract class BaseRepository<Entity extends BaseEntity, CreatableEntity, EditableEntity> {
    private repository;
    protected constructor(repository: Repository<Entity>);
    findOneById(id: number): Promise<Entity | null>;
    save(entity: CreatableEntity): Promise<Entity>;
    create(entity: CreatableEntity): Promise<Entity>;
    protected findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;
    protected findMany(options: FindManyOptions<Entity>): Promise<Entity[]>;
    protected findManyAndCount(options: FindManyOptions<Entity>): Promise<[Entity[], number]>;
    protected update(filter: FindOptionsWhere<Entity>, entity: EditableEntity): Promise<void>;
    protected delete(filter: FindOptionsWhere<Entity>): Promise<void>;
}
