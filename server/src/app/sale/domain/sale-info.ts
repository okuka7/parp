import { Timestamptz } from '@common/mikro-orm/type/js-joda';
import { Money } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import {
  Cascade,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Party } from '@root/app/party/domain/party';
import { PartyOption } from './option';
import { Policy } from './policy';

@Entity({
  tableName: 'party_sale_info',
  forceConstructor: true,
})
export class SaleInfo {
  @OneToOne(() => Party, { name: 'party_id', cascade: [Cascade.ALL] })
  private _partyId!: string;

  @Property({ type: Timestamptz, name: 'sale_start_at' })
  private _saleStartAt!: ZonedDateTime;

  @OneToMany(() => PartyOption, (option) => option.partyId, {
    name: 'options',
    orderBy: { optionNo: 'ASC' },
    cascade: [Cascade.ALL],
  })
  private _options: PartyOption[] = [];

  constructor(
    partyId: string,
    saleStartAt: ZonedDateTime,
    options: PartyOption[] = [],
  ) {
    this._partyId = partyId;
    this._saleStartAt = saleStartAt;
    this._options = options;
  }

  addOption({
    name,
    price,
    policy,
    maxCount,
  }: {
    name: string;
    price: Money;
    policy: Policy;
    maxCount: number;
  }): void {
    this._options.push(
      new PartyOption(
        this._partyId,
        this.getNextOptionNo(),
        name,
        price,
        policy,
        maxCount,
      ),
    );
    this.validSumOfMaxCount();
  }

  removeOption(optionNo: number): void {
    if (this._options.length && this.getOption(optionNo).isDefault()) {
      throw new Error('기본 옵션은 삭제할 수 없습니다.');
    }
    this._options = this._options.filter(
      (option) => option.optionNo !== optionNo,
    );
  }

  changeSaleStartAt(saleStartAt: ZonedDateTime): void {
    if (this.isOnSale()) throw new Error('Already on sale');
    this._saleStartAt = saleStartAt;
  }

  changeOptionName(optionNo: number, name: string): void {
    this.getOption(optionNo).changeName(name);
  }

  changeOptionPrice(optionNo: number, price: Money): void {
    this.getOption(optionNo).changePrice(price);
  }

  sell(optionNo: number, count: number): void {
    const option = this.getOption(optionNo);
    option.sell(count);
    if (option.isInheritable()) this.getDefaultOption().sell(count);
  }

  cancel(optionNo: number, count: number): void {
    const option = this.getOption(optionNo);
    option.cancel(count);
    if (option.isInheritable()) this.getDefaultOption().cancel(count);
  }

  rebalance(options: { optionNo: number; maxCount: number }[]) {
    options.forEach((option) => {
      this.getOption(option.optionNo).changeMaxCount(option.maxCount);
    });

    this.validSumOfMaxCount();
  }

  isOnSale(): boolean {
    return this._saleStartAt.isBefore(ZonedDateTime.now());
  }

  isSoldOut(): boolean {
    return (
      this.getDefaultOption().isSoldOut() &&
      this.getIndependentOptions().every((option) => option.isSoldOut())
    );
  }

  private getNextOptionNo(): number {
    return this._options.length
      ? this._options[this._options.length - 1].optionNo + 1
      : 0;
  }

  private getDefaultOption(): PartyOption {
    const defaultOption = this._options.find((option) => option.isDefault());
    if (!defaultOption) {
      throw new Error(`default option not found`);
    }
    return defaultOption;
  }

  private getInheritableOptions(): PartyOption[] {
    return this._options.filter((option) => option.isInheritable());
  }

  private getIndependentOptions(): PartyOption[] {
    return this._options.filter((option) => !option.isInheritable());
  }

  private getOption(optionNo: number): PartyOption {
    const option = this._options.find((option) => option.optionNo === optionNo);
    if (!option) {
      throw new Error(`option not found: ${optionNo}`);
    }
    return option;
  }

  private validSumOfMaxCount(): void {
    if (this.sumInheritableMaxCount() > this.getDefaultOption().maxCount)
      throw new Error(
        'sum of inheritable max count must be less than default max count',
      );
  }

  private sumInheritableMaxCount(): number {
    return this.getInheritableOptions().reduce(
      (sum, option) => sum + option.maxCount,
      0,
    );
  }
}
