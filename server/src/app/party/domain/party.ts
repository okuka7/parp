import { Timestamptz } from '@common/mikro-orm/type/js-joda';
import { Address } from '@common/value';
import { ChronoUnit, ZonedDateTime } from '@js-joda/core';
import { PrimaryUlid } from '@lib/decorator/db.ulid.decorator';
import {
  Cascade,
  Embedded,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { ulid } from 'ulid';
import { PartyInfo } from './info';

@Entity({
  forceConstructor: true,
})
export class Party {
  @PrimaryUlid()
  id: string = ulid();

  @ManyToOne(() => PartyInfo, { cascade: [Cascade.ALL] })
  info!: PartyInfo;

  @Property({ type: Timestamptz })
  date!: ZonedDateTime;

  @Embedded()
  address!: Address;

  constructor(info: PartyInfo, date: ZonedDateTime, address: Address) {
    this.info = info;
    this.date = date;
    this.address = address;
  }

  checkCancel(): void {
    this.isStandby();
  }

  changeDate(date: ZonedDateTime): void {
    this.isStandby();
    this.date = date;
  }

  changeAddress(address: Address): void {
    this.isStandby();
    this.address = address;
  }

  isStandby(): void {
    if (this.date.until(ZonedDateTime.now(), ChronoUnit.DAYS) <= 7)
      throw new Error('7일 이내에는 변경할 수 없습니다.');
  }
}
