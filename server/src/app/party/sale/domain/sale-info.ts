import { Timestamptz } from '@common/mikro-orm/type/js-joda';
import { ZonedDateTime } from '@js-joda/core';
import { ForeignUlid } from '@lib/decorator/db.ulid.decorator';
import { Entity, OneToMany, Property } from '@mikro-orm/core';
import { PartyOption } from './option';

@Entity({
  tableName: 'party_sale_info',
})
export class SaleInfo {
  @ForeignUlid()
  partyId!: string;

  @Property()
  ticketLimit!: number;

  @Property({ type: Timestamptz })
  saleStart!: ZonedDateTime;

  @OneToMany(() => PartyOption, (option) => option.partyId)
  options!: PartyOption[];

  addOption(option: PartyOption): void {
    option.id = this.options.length;
    option.partyId = this.partyId;
    this.options.push(option);
  }

  getDefaultOption(): PartyOption | undefined {
    return this.options.find((option) => option.id === 0);
  }

  getAdditionalOptions(): PartyOption[] {
    return this.options.filter((option) => option.id > 0);
  }
}
