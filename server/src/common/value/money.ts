export class Money {
  constructor(readonly value: number, readonly currency: string) {}

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

    return new Money(this.value - money.value, this.currency);
  }

  public multiply(multiplier: number): Money {
    return new Money(this.value * multiplier, this.currency);
  }
}
