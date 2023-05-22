import { Timestamptz } from '@common/mikro-orm/type/js-joda';
import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import { ForeignUlid } from '@lib/decorator/db.ulid.decorator';
import { Embedded, Entity, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'party_info',
})
export class PartyInfo {
  @ForeignUlid()
  partyId!: string;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  notes!: string;

  @Embedded(() => Address)
  location!: Address;

  @Property({ type: Timestamptz })
  date!: ZonedDateTime;

  static create(
    partyId: string,
    name: string,
    description: string,
    notes: string,
    location: Address,
    date: ZonedDateTime,
  ): PartyInfo {
    const instance = new PartyInfo();
    instance.partyId = partyId;
    instance.name = name;
    instance.description = description;
    instance.notes = notes;
    instance.location = location;
    instance.date = date;
    return instance;
  }
}
