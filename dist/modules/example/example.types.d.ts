import { OmitBaseEntity, Optional } from 'src/shared/base/base.types';
import { Example } from './example.entity';
export type CreatableExample = Optional<OmitBaseEntity<Example>, 'optional'>;
export type EditableExample = Partial<CreatableExample>;
