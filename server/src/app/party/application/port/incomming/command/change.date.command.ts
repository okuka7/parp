import { ZonedDateTime } from '@js-joda/core';
import { IsUlid } from '@lib/validation/isUlid';
import { IsZonedDateTime } from '@lib/validation/isZonedDateTime';
import { validateOrReject } from 'class-validator';

export class ChangeDateCommand {
  @IsUlid({ message: 'Invalid party id' })
  readonly partyId: string;

  @IsZonedDateTime({ message: 'Invalid date' })
  readonly date: ZonedDateTime;

  constructor(partyId: string, date: ZonedDateTime) {
    this.partyId = partyId;
    this.date = date;
    validateOrReject(this);
  }
}
