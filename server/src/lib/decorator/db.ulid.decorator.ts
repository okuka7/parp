import { Ulid } from '@common/mikro-orm/type/ulid';
import { OneToOne, PrimaryKey } from '@mikro-orm/core';
import { applyDecorators } from '@nestjs/common';
import { ulid } from 'ulid';

export function PrimaryUlid() {
  return applyDecorators(PrimaryKey({ type: Ulid, default: ulid() }));
}

export function ForeignUlid() {
  return applyDecorators(OneToOne({ type: Ulid, mapToPk: true }));
}
