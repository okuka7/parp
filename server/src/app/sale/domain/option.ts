import { Money } from '@common/value';
import {
  Embedded,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Policy } from './policy';
import { SaleInfo } from './sale-info';

@Entity({
  tableName: 'party_option',
})
export class PartyOption {
  @ManyToOne(() => SaleInfo, { primary: true, mapToPk: true, name: 'party_id' })
  private _partyId!: string;

  @PrimaryKey({ name: 'option_no' })
  private _optionNo!: number;

  @Property({ name: 'name', length: 50 })
  private _name!: string;

  @Embedded({ entity: () => Money, prefix: 'price_' })
  private _price!: Money;

  @Embedded({ entity: () => Policy, prefix: 'policy_' })
  private _policy!: Policy;

  @Property({ name: 'sold_count' })
  private _soldCount = 0;

  @Property({ name: 'max_count' })
  private _maxCount!: number;

  constructor(
    partyId: string,
    orderNo: number,
    name: string,
    price: Money,
    policy: Policy,
    maxCount: number,
  ) {
    this._partyId = partyId;
    this._optionNo = orderNo;
    this._name = name;
    this._price = price;
    this._policy = policy;
    this._maxCount = maxCount;
    this.validatePrice();
    this.validateMaxCount();
  }

  get partyId(): string {
    return this._partyId;
  }

  get optionNo(): number {
    return this._optionNo;
  }

  get maxCount(): number {
    return this._maxCount;
  }

  isDefault(): boolean {
    return this._optionNo === 0;
  }

  isAdditional(): boolean {
    return this._optionNo !== 0;
  }

  isInheritable(): boolean {
    return this.isAdditional() && this._policy.isInheritable();
  }

  remainingCount(): number {
    return this._maxCount - this._soldCount;
  }

  isSoldOut(): boolean {
    return this.remainingCount() <= 0;
  }

  sell(count: number): void {
    if (this.remainingCount() < count) {
      throw new Error('Sold out');
    }
    this._soldCount += count;
  }

  cancel(count: number): void {
    if (this._soldCount < count) {
      throw new Error('Invalid cancel count');
    }
    this._soldCount -= count;
  }

  changeName(name: string): void {
    this._name = name;
  }

  changeMaxCount(limit: number): void {
    if (limit < this._soldCount) {
      throw new Error('Cannot rebalance to a lower limit');
    }
    this._maxCount = limit;
    this.validateMaxCount();
  }

  changePrice(price: Money): void {
    this._price = price;
    this.validatePrice();
  }

  private validatePrice(): void {
    if (this._price.cheaperThan(new Money(1000)))
      throw new Error('Price must be greater than 1000');
    if (this._price.value % 100 !== 0)
      throw new Error('Price must be multiple of 100');
  }

  private validateMaxCount(): void {
    if (this._maxCount < 10)
      throw new Error('Max count must be greater than 10');
  }
}
