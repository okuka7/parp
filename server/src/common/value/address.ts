export class Address {
  constructor(
    readonly country: string,
    readonly city: string,
    readonly district: string,
    readonly street: string,
    readonly number: string,
    readonly detail: string = '',
  ) {
    this.valid();
  }

  private valid(): void {
    if (this.country.length === 0) {
      throw new Error('Invalid country');
    }
    if (this.city.length === 0) {
      throw new Error('Invalid city');
    }
    if (this.district.length === 0) {
      throw new Error('Invalid district');
    }
    if (this.street.length === 0) {
      throw new Error('Invalid street');
    }
    if (this.number.length === 0) {
      throw new Error('Invalid number');
    }
  }

  public getFullAddress(): string {
    return (
      `${this.city} ${this.district} ${this.street} ${this.number}` +
      (this.detail.length > 0 ? ` ${this.detail}` : '')
    );
  }

  public static fromString(stringAddress: string): Address {
    const [country, city, district, street, number, detail] =
      stringAddress.split(' ');
    return new Address(country, city, district, street, number, detail);
  }
}
