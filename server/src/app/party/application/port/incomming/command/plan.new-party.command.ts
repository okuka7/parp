import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';
import { IsUlid } from '@lib/validation/isUlid';
import { IsZonedDateTime } from '@lib/validation/isZonedDateTime';
import { ValidateNested, validateOrReject } from 'class-validator';

export class PlanPartyCommand {
  @IsUlid({ message: 'Invalid info id' })
  readonly infoId: string;

  @ValidateNested()
  readonly address: Address;

  @IsZonedDateTime({ message: 'Invalid date' })
  readonly date: ZonedDateTime;

  constructor(infoId: string, address: Address, date: ZonedDateTime) {
    this.infoId = infoId;
    this.address = address;
    this.date = date;
    validateOrReject(this);
  }
}
