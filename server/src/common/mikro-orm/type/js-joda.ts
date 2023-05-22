import { ZonedDateTime } from '@js-joda/core';
import { Type, ValidationError } from '@mikro-orm/core';

export class Timestamptz extends Type<ZonedDateTime, string> {
  convertToDatabaseValue(value: ZonedDateTime): string {
    if (value instanceof ZonedDateTime) {
      return value.toString();
    }
    throw ValidationError.invalidType(Timestamptz, value, 'JS');
  }

  convertToJSValue(value: string): ZonedDateTime {
    try {
      return ZonedDateTime.parse(value);
    } catch (e) {
      throw ValidationError.invalidType(Timestamptz, value, 'database');
    }
  }

  getColumnType(): string {
    return 'timestamptz';
  }
}
