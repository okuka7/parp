import { ZonedDateTime } from '@js-joda/core';
import {
  buildMessage,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { isZonedDateTime } from './isZonedDateTime';

export const IS_FUTURE = 'isFuture';

export function isFuture(value: unknown): boolean {
  return (
    isZonedDateTime(value) &&
    ZonedDateTime.now().isBefore(value as ZonedDateTime)
  );
}

export function IsFuture(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: IS_FUTURE,
      target: object.constructor,
      async: false,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return isFuture(value);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return `${eachPrefix}$property must be Future`;
        }, validationOptions),
      },
    });
  };
}
