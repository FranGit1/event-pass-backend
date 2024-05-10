import { BaseEntity } from './base.entity';
export type OmitBaseEntity<E, P extends string = ''> = Omit<E, keyof BaseEntity | P>;
export type Optional<B, E extends keyof B> = Pick<Partial<B>, E> & Omit<B, E>;
