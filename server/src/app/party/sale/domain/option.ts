import { Money } from '@common/value';
import {
  Embedded,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { SaleInfo } from './sale-info';

@Entity({
  tableName: 'party_sale_option',
})
export class PartyOption {
  @ManyToOne(() => SaleInfo, { primary: true })
  party!: SaleInfo;

  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Embedded({ entity: () => Money, prefix: 'price_' })
  price!: Money;

  @Property()
  soldCount = 0;

  @Property()
  maxCount!: number;

  public static create(
    name: string,
    price: Money,
    maxCount: number,
  ): PartyOption {
    const instance = new PartyOption();
    instance.name = name;
    instance.price = price;
    instance.maxCount = maxCount;
    return instance;
  }

  public remainingCount(): number {
    return this.maxCount - this.soldCount;
  }

  public isSoldOut(): boolean {
    return this.remainingCount() <= 0;
  }

  public rebalance(limit: number): void {
    if (limit < this.soldCount) {
      this.soldCount = limit;
      throw new Error('Cannot rebalance to a lower limit');
    }
    this.maxCount = limit;
  }
}
