import { ZonedDateTimeType } from '@common/mikro-orm/type/js-joda';
import { ZonedDateTime } from '@js-joda/core';
import { Entity, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { Party } from '../../party';
import { PartyOption } from './option';

@Entity({
  tableName: 'party_sale_info',
})
export class SaleInfo {
  @OneToOne(() => Party, { primary: true })
  party!: Party;

  @Property()
  ticketLimit!: number;

  @Property({ type: ZonedDateTimeType })
  saleStart!: ZonedDateTime;

  @OneToMany(() => PartyOption, (option) => option.party)
  options!: PartyOption[];

  addOption(option: PartyOption): void {
    option.id = this.options.length;
    option.party = this;
    this.options.push(option);
  }

  getDefaultOption(): PartyOption | undefined {
    return this.options.find((option) => option.id === 0);
  }

  getAdditionalOptions(): PartyOption[] {
    return this.options.filter((option) => option.id > 0);
  }
}
