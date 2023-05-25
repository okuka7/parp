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
  @ManyToOne(() => SaleInfo, { primary: true, mapToPk: true })
  partyId!: string;

  @PrimaryKey()
  optionNo!: number;

  @Property()
  name!: string;

  @Embedded({ entity: () => Money, prefix: 'price_' })
  price!: Money;

  @Embedded({ entity: () => Policy, prefix: 'policy_' })
  policy!: Policy;

  @Property()
  soldCount = 0;

  @Property()
  maxCount!: number;

  constructor(
    partyId: string,
    orderNo: number,
    name: string,
    price: Money,
    policy: Policy,
    maxCount: number,
  ) {
    this.partyId = partyId;
    this.optionNo = orderNo;
    this.name = name;
    this.price = price;
    this.policy = policy;
    this.maxCount = maxCount;
    this.validatePrice();
    this.validateMaxCount();
  }

  public isDefault(): boolean {
    return this.optionNo === 0;
  }

  public isAdditional(): boolean {
    return this.optionNo !== 0;
  }

  public isInheritable(): boolean {
    return this.isAdditional() && this.policy.isInheritable();
  }

  private remainingCount(): number {
    return this.maxCount - this.soldCount;
  }

  public isSoldOut(): boolean {
    return this.remainingCount() <= 0;
  }

  public sell(count: number): void {
    if (count < 0) {
      throw new Error('Count must be greater than 0');
    }
    if (this.remainingCount() < count) {
      throw new Error('Sold out');
    }
    this.soldCount += count;
  }

  public cancel(count: number): void {
    if (count < 0) {
      throw new Error('Count must be greater than 0');
    }
    if (this.soldCount < count) {
      throw new Error('Invalid cancel count');
    }
    this.soldCount -= count;
  }

  public changeMaxCount(limit: number): void {
    if (limit < this.soldCount) {
      throw new Error('Cannot rebalance to a lower limit');
    }
    this.maxCount = limit;
    this.validateMaxCount();
  }

  public changePrice(price: Money): void {
    this.price = price;
    this.validatePrice();
  }

  private validatePrice(): void {
    if (this.price.cheaperThan(new Money(1000)))
      throw new Error('Price must be greater than 1000');
    if (this.price.value % 100 !== 0)
      throw new Error('Price must be multiple of 100');
  }

  private validateMaxCount(): void {
    if (this.maxCount < 10)
      throw new Error('Max count must be greater than 10');
  }
}
