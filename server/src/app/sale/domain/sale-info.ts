import { Timestamptz } from '@common/mikro-orm/type/js-joda';
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

@Entity({
  tableName: 'party_sale_info',
})
export class SaleInfo {
  @OneToOne(() => Party, { cascade: [Cascade.ALL] })
  partyId!: string;

  @Property({ type: Timestamptz })
  saleStartAt!: ZonedDateTime;

  @OneToMany(() => PartyOption, (option) => option.partyId, {
    orderBy: { optionNo: 'ASC' },
    cascade: [Cascade.ALL],
  })
  options: PartyOption[] = [];

  addOption(option: PartyOption): void {
    this.options.push(option);
    this.validSumOfMaxCount();
  }

  getDefaultOption(): PartyOption {
    const defaultOption = this.options.find((option) => option.isDefault());
    if (!defaultOption) {
      throw new Error(`default option not found`);
    }
    return defaultOption;
  }

  getAdditionalOptions(): PartyOption[] {
    return this.options.filter((option) => option.isAdditional());
  }

  getOption(optionNo: number): PartyOption {
    const option = this.options.find((option) => option.optionNo === optionNo);
    if (!option) {
      throw new Error(`option not found: ${optionNo}`);
    }
    return option;
  }

  changeSaleStartAt(saleStartAt: ZonedDateTime): void {
    if (this.isOnSale()) throw new Error('Already on sale');
    this.saleStartAt = saleStartAt;
  }

  sell(optionNo: number, count: number): void {
    const option = this.getOption(optionNo);
    option.sell(count);
    if (option.policy.isInheritable()) this.getDefaultOption().sell(count);
  }

  cancel(optionNo: number, count: number): void {
    const option = this.getOption(optionNo);
    option.cancel(count);
    if (option.policy.isInheritable()) this.getDefaultOption().cancel(count);
  }

  rebalance(options: Pick<PartyOption, 'optionNo' | 'maxCount'>[]) {
    options.forEach((option) => {
      this.getOption(option.optionNo).changeMaxCount(option.maxCount);
    });

    this.validSumOfMaxCount();
  }

  isOnSale(): boolean {
    return this.saleStartAt.isBefore(ZonedDateTime.now());
  }

  isSoldOut(): boolean {
    return this.options.every((option) => option.isSoldOut());
  }

  getNextOptionId(): number {
    return this.options.length
      ? this.options[this.options.length - 1].optionNo + 1
      : 0;
  }

  private validSumOfMaxCount(): void {
    const sumOfInheritableMaxCount = this.options
      .filter((option) => option.policy.isInheritable())
      .reduce((sum, option) => sum + option.maxCount, 0);
    if (sumOfInheritableMaxCount > this.getDefaultOption().maxCount)
      throw new Error(
        'sum of inheritable max count must be less than default max count',
      );
  }
}
