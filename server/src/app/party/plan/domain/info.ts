import { ZonedDateTimeType } from '@common/mikro-orm/type/js-joda';
import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import { Embedded, Entity, OneToOne, Property } from '@mikro-orm/core';
import { Party } from '../../party';

@Entity({
  tableName: 'party_info',
})
export class PartyInfo {
  @OneToOne(() => Party, { primary: true })
  partyId!: Party;

  @Property()
  name!: string;

  @Property()
  description!: string;

  @Property()
  notes!: string;

  @Embedded(() => Address)
  location!: Address;

  @Property({ type: ZonedDateTimeType })
  date!: ZonedDateTime;

  static create(
    partyId: Party,
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
