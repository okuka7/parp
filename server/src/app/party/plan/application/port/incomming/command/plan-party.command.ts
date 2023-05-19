import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  ValidateNested,
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

  @ValidateNested()
  readonly location: Address;

  readonly date: ZonedDateTime;

  @IsUUID('4', { message: 'Group id is not uuid v4.' })
  readonly groupId: string;

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
    this.location = address;
    this.date = date;
    validateOrReject(this);
  }
}
