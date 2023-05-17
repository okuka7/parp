import { IsEnum, IsNumber, Min, validateSync } from 'class-validator';

const Currency = {
  KRW: 'KRW',
  USD: 'USD',
} as const;

type Currency = (typeof Currency)[keyof typeof Currency];

export class Money {
  @IsNumber({}, { message: 'Money is not number.' })
  @Min(0, { message: 'Money is negative.' })
  readonly value: number;

  @IsEnum(Currency)
  readonly currency: Currency;

  constructor(value: number, currency: Currency = 'KRW') {
    this.value = value;
    this.currency = currency;
    validateSync(this);
  }

  public equals(money: Money): boolean {
    return this.value === money.value && this.currency === money.currency;
  }

  public add(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error('currency is different');
    }

    return new Money(this.value + money.value, this.currency);
  }

  public subtract(money: Money): Money {
    if (this.currency !== money.currency) {
      throw new Error('currency is different');
    }

    if (this.value < money.value) {
      throw new Error('money is negative');
    }

    return new Money(this.value - money.value, this.currency);
  }

  public multiply(multiplier: number): Money {
    return new Money(this.value * multiplier, this.currency);
  }

  public divide(divisor: number): Money {
    return new Money(this.value / divisor, this.currency);
  }

  public cheaperThan(money: Money): boolean {
    if (this.currency !== money.currency) {
      throw new Error('currency is different');
    }

    return this.value < money.value;
  }

  public moreExpensiveThan(money: Money): boolean {
    if (this.currency !== money.currency) {
      throw new Error('currency is different');
    }

    return this.value > money.value;
  }

  public currencyEquals(currency: Currency): boolean {
    return this.currency === currency;
  }
}
