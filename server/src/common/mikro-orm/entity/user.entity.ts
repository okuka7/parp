import { ZonedDateTime } from '@js-joda/core';
import { CreatedAt } from '@lib/decorator/db.time.decorator';
import { PrimaryUlid } from '@lib/decorator/db.ulid.decorator';
import { Entity } from '@mikro-orm/core';

@Entity({
  tableName: 'users',
})
export class User {
  @PrimaryUlid()
  id!: string;

  @CreatedAt()
  createdAt?: ZonedDateTime;
}
