import { ZonedDateTime } from '@js-joda/core';
import { IsFuture } from '@lib/validation/isFuture';
import { IsUlid } from '@lib/validation/isUlid';
import { IsZonedDateTime } from '@lib/validation/isZonedDateTime';
import { validateOrReject } from 'class-validator';

export class ChangeSaleScheduleCommand {
  @IsUlid()
  readonly partyId: string;

  @IsZonedDateTime({ message: 'Invalid startSaleAt.' })
  @IsFuture({ message: 'startSaleAt must be a future date.' })
  startSaleAt: ZonedDateTime;
  constructor(partyId: string, startSaleAt: ZonedDateTime) {
    this.partyId = partyId;
    this.startSaleAt = startSaleAt;
    validateOrReject(this);
  }
}
