import { Embeddable, Enum, Property } from '@mikro-orm/core';
import { IsEnum, MinLength, validateOrReject } from 'class-validator';

export const Country = ['KR', 'US', 'JP'] as const;
export type Country = (typeof Country)[number];

@Embeddable()
export class Address {
  @Enum({ items: () => Country })
  @IsEnum(Country, { message: 'Invalid country' })
  readonly country: Country = 'KR';

  @Property()
  @MinLength(3, { message: 'City must be at least 3 characters' })
  readonly city: string;

  @Property()
  @MinLength(2, { message: 'District must be at least 3 characters' })
  readonly district: string;

  @Property()
  @MinLength(2, { message: 'Street must be at least 3 characters' })
  readonly street: string;

  @Property()
  @MinLength(1, { message: 'Number must be at least 1 characters' })
  readonly number: string;

  @Property()
  readonly detail: string = '';

  constructor(
    city: string,
    district: string,
    street: string,
    number: string,
    detail = '',
  ) {
    this.city = city;
    this.district = district;
    this.street = street;
    this.number = number;
    this.detail = detail;
    validateOrReject(this);
  }

  @Property({ persist: false })
  get fullAddress(): string {
    return (
      `${this.city} ${this.district} ${this.street} ${this.number}` +
      (this.detail.length > 0 ? ` ${this.detail}` : '')
    );
  }

  public static fromString(stringAddress: string): Address {
    const [city, district, street, number, detail] = stringAddress.split(' ');
    return new Address(city, district, street, number, detail);
  }
}
