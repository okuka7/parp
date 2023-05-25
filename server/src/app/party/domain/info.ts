import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import { PrimaryUlid } from '@lib/decorator/db.ulid.decorator';
import {
  Embedded,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ulid } from 'ulid';
import { Category } from './category';
import { Detail } from './detail';
import { Party } from './party';

@Entity({
  tableName: 'party_info',
})
export class PartyInfo {
  @PrimaryUlid()
  id: string = ulid();

  @ManyToOne(() => Category)
  category!: Category;

  @Property()
  name!: string;

  @Embedded(() => Detail)
  detail!: Detail;

  @OneToMany(() => Party, (party) => party.info)
  parties: Party[] = [];

  constructor(category: Category, name: string, detail: Detail) {
    this.category = category;
    this.name = name;
    this.detail = detail;
  }

  changeName(name: string): void {
    this.name = name;
  }

  changeDetail(detail: Detail): void {
    this.detail = detail;
  }

  planNewParty(date: ZonedDateTime, address: Address) {
    const party = new Party(this, date, address);
    this.parties.push(party);
  }

  changePartyDate(partyId: string, date: ZonedDateTime) {
    this.getParty(partyId).changeDate(date);
  }

  changePartyAddress(partyId: string, address: Address) {
    this.getParty(partyId).changeAddress(address);
  }

  cancelParty(partyId: string) {
    this.getParty(partyId).checkCancel();
    this.parties = this.parties.filter((p) => p.id !== partyId);
  }

  private getParty(partyId: string): Party {
    const party = this.parties.find((p) => p.id === partyId);
    if (!party) throw new Error('Invalid party id');
    return party;
  }
}
