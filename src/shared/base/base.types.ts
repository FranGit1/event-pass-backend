import { BaseEntity } from './base.entity';

/**
 * Omit the base entity properties from the entity
 * E along with optional properties P if provided.
 */
export type OmitBaseEntity<E, P extends string = ''> = Omit<E, keyof BaseEntity | P>;
/**
 * Make set of properties optional within the given type.
 */
export type Optional<B, E extends keyof B> = Pick<Partial<B>, E> & Omit<B, E>;
