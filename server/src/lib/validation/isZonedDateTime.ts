import { ZonedDateTime } from '@js-joda/core';
import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

export const IS_ZONED_DATE_TIME = 'isZonedDateTime';

export function isZonedDateTime(value: unknown): boolean {
  return (
    value instanceof ZonedDateTime ||
    (typeof value === 'string' &&
      ZonedDateTime.parse(value) instanceof ZonedDateTime)
  );
}

export function IsZonedDateTime(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: IS_ZONED_DATE_TIME,
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isZonedDateTime(value);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix}$property must be a ZonedDateTime`;
        }, validationOptions),
      },
    });
  };
}
