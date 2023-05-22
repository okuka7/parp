import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export const IS_ULID = 'isUlid';

const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;

export function isUlid(value: unknown): boolean {
  return typeof value === 'string' && ulidRegex.test(value);
}

export function IsUlid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUlid',
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isUlid(value);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix}$property must be a ULID`;
        }, validationOptions),
      },
    });
  };
}
