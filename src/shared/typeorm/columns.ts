import { Column, ColumnOptions } from 'typeorm';

type CustomColumnOptions = Omit<ColumnOptions, 'type'>;

export const IntegerColumn = (options?: CustomColumnOptions) => Column({ type: 'integer', ...options });
export const TextColumn = (options?: CustomColumnOptions) => Column({ type: 'text', ...options });
export const BooleanColumn = (options?: CustomColumnOptions) => Column({ type: 'boolean', ...options });
export const DoubleColumn = (options?: CustomColumnOptions) => Column({ type: 'double precision', ...options });
export const EnumColumn = (options?: CustomColumnOptions) => Column({ type: 'enum', ...options });
export const JSONColumn = (options?: CustomColumnOptions) => Column({ type: 'jsonb', ...options });
export const DateColumn = (options?: CustomColumnOptions) => Column({ type: 'timestamptz', ...options });
