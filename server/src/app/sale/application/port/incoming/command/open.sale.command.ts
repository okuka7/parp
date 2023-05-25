import { ZonedDateTime } from '@js-joda/core';
import { IsPositive, IsUUID, validateOrReject } from 'class-validator';

export class OpenSaleCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  readonly partyId: string;

  @IsPositive({ message: 'ticketLimit must be a positive number.' })
  readonly ticketLimit: number;

  readonly startSaleAt: ZonedDateTime;

  constructor(
    partyId: string,
    ticketLimit: number,
    startSaleAt: ZonedDateTime,
  ) {
    this.partyId = partyId;
    this.ticketLimit = ticketLimit;
    this.startSaleAt = startSaleAt;
    validateOrReject(this);
  }
}
