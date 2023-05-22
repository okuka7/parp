import { Timestamptz } from '@common/mikro-orm/type/js-joda';
import { ZonedDateTime } from '@js-joda/core';
import { Property } from '@mikro-orm/core';
import { applyDecorators } from '@nestjs/common';

export function CreatedAt() {
  return applyDecorators(
    Property({
      type: Timestamptz,
      default: ZonedDateTime.now().toString(),
      onCreate: () => ZonedDateTime.now(),
    }),
  );
}

export function UpdatedAt() {
  return applyDecorators(
    Property({ type: Timestamptz, onUpdate: () => ZonedDateTime.now() }),
  );
}

export function DeletedAt() {
  return applyDecorators(Property({ type: Timestamptz, nullable: true }));
}
