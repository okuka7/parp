import { ZonedDateTime } from '@js-joda/core';
import { IsUUID, validateOrReject } from 'class-validator';

export class ChangeDateCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  readonly partyId: string;

  readonly date: ZonedDateTime;

  constructor(partyId: string, date: ZonedDateTime) {
    this.partyId = partyId;
    this.date = date;
    validateOrReject(this);
  }
}
