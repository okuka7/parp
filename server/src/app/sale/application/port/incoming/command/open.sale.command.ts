import { ZonedDateTime } from '@js-joda/core';
import { IsFuture } from '@lib/validation/isFuture';
import { IsZonedDateTime } from '@lib/validation/isZonedDateTime';
import { IsPositive, IsUUID, validateOrReject } from 'class-validator';

export class OpenSaleCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  readonly partyId: string;

  @IsPositive({ message: 'ticketLimit must be a positive number.' })
  readonly ticketLimit: number;

  @IsZonedDateTime({ message: 'Invalid startSaleAt.' })
  @IsFuture({ message: 'startSaleAt must be a future date.' })
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
