import { ExampleRepository } from './example.repository';
import { CreatableExample } from './example.types';
import { Example } from './example.entity';
export declare class ExampleService {
    private readonly exampleRepository;
    constructor(exampleRepository: ExampleRepository);
    findOneById(id: number): Promise<Example | null>;
    save(example: CreatableExample): Promise<Example>;
}
