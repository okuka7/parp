import { Type } from '@mikro-orm/core';

export class Ulid extends Type<string, string> {
  convertToDatabaseValue(value: string): string {
    return value;
  }

  convertToJSValue(value: string): string {
    return value;
  }

  getColumnType(): string {
    return 'char(26)';
  }
}
