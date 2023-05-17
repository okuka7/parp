import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import {
  IsInstance,
  IsString,
  MaxLength,
  MinLength,
  validateOrReject,
} from 'class-validator';

export class PlanPartyCommand {
  @IsString({ message: 'Party name is not string.' })
  @MinLength(3, { message: 'Party name is too short.' })
  @MaxLength(50, { message: 'Party name is too long.' })
  readonly name: string;

  @IsString({ message: 'Description is not string.' })
  readonly description: string;

  @IsString({ message: 'Notes is not string.' })
  readonly notes: string;

  @IsInstance(Address, { message: 'Address is not instance of Address.' })
  readonly address: Address;

  readonly date: ZonedDateTime;

  constructor(
    name: string,
    description: string,
    notes: string,
    address: Address,
    date: ZonedDateTime,
  ) {
    this.name = name;
    this.description = description;
    this.notes = notes;
    this.address = address;
    this.date = date;
    validateOrReject(this);
  }
}
