export class Address {
  constructor(
    readonly country: string,
    readonly city: string,
    readonly district: string,
    readonly street: string,
    readonly number: string,
    readonly detail: string,
  ) {}

  public getFullAddress(): string {
    return `${this.city} ${this.district} ${this.street} ${this.number} ${this.detail}`;
  }
}
