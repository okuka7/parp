import { ZonedDateTime } from '@js-joda/core';
import { validate } from 'uuid';

export class ChangeSaleScheduleCommand {
  constructor(readonly partyId: string, readonly startSaleAt: ZonedDateTime) {
    this.validIds();
    this.validStartSaleAt();
  }

  private validIds(): void {
    if (validate(this.partyId)) throw new Error('Invalid party id');
  }

  private validStartSaleAt(): void {
    if (this.startSaleAt.isBefore(ZonedDateTime.now())) {
      throw new Error('Invalid start sale at');
    }
  }
}
