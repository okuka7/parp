import { ZonedDateTime } from '@js-joda/core';
import { IsZonedDateTime } from '@lib/validation/isZonedDateTime';
import { Transform, Type } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

export function ZonedDateTimeProperty(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    Transform(
      validationOptions?.each === true
        ? ({ value }: { value: readonly string[] }) =>
            value.map((value) => ZonedDateTime.parse(value)) as any
        : ({ value }: { value: string }) => ZonedDateTime.parse(value) as any,
    )(object, propertyName);
    IsZonedDateTime({
      ...validationOptions,
    })(object, propertyName);
    Type(() => ZonedDateTime)(object, propertyName);
  };
}
