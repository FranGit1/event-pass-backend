import { Equal, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import { BaseEntity } from './base.entity';

export abstract class BaseRepository<Entity extends BaseEntity, CreatableEntity, EditableEntity> {
  protected constructor(private repository: Repository<Entity>) {}

  findOneById(id: number): Promise<Entity | null> {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.repository.findOne({ where: { id: Equal(id) } });
  }

  save(entity: CreatableEntity): Promise<Entity> {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.repository.save(entity);
  }

  create(entity: CreatableEntity): Promise<Entity> {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.repository.create(entity);
  }

  protected findOne(options: FindOneOptions<Entity>): Promise<Entity | null> {
    return this.repository.findOne(options);
  }

  protected async findMany(options: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  protected async findManyAndCount(options: FindManyOptions<Entity>): Promise<[Entity[], number]> {
    return this.repository.findAndCount(options);
  }

  protected update(filter: FindOptionsWhere<Entity>, entity: EditableEntity): Promise<void> {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.repository.update(filter, entity);
  }

  protected delete(filter: FindOptionsWhere<Entity>): Promise<void> {
    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return this.repository.softDelete(filter);
  }
}
