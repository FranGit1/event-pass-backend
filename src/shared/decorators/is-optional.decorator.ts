import { ValidationOptions, ValidateIf } from 'class-validator';

export function IsOptional(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ValidateIf((_: any, value: any) => {
    return value !== undefined;
  }, validationOptions);
}
