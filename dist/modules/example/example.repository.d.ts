import { Repository } from 'typeorm';
import { Example } from './example.entity';
import { BaseRepository } from 'src/shared/base/base.repository';
import { CreatableExample, EditableExample } from './example.types';
export declare class ExampleRepository extends BaseRepository<Example, CreatableExample, EditableExample> {
    private readonly exampleRepository;
    constructor(exampleRepository: Repository<Example>);
}
