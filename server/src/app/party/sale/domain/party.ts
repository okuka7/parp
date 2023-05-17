import { ZonedDateTime } from '@js-joda/core';
import { PartyOption } from './option';

export class Party {
  constructor(
    private _id: string,
    private _date: ZonedDateTime,
    private _ticketLimit?: number,
    private _startSaleAt?: ZonedDateTime,
    private _options: PartyOption[] = [],
  ) {}

  get id(): string {
    return this._id;
  }

  get date(): ZonedDateTime {
    return this._date;
  }

  get ticketLimit(): number | undefined {
    return this._ticketLimit;
  }

  get startSaleAt(): ZonedDateTime | undefined {
    return this._startSaleAt;
  }

  get options(): PartyOption[] {
    return this._options;
  }

  get isForSale(): boolean {
    return !!this._ticketLimit;
  }

  get isSaleStarted(): boolean {
    return (
      !!this._startSaleAt && this._startSaleAt.isBefore(ZonedDateTime.now())
    );
  }

  public openSale(ticketLimit: number, startSaleAt: ZonedDateTime): void {
    if (this.isForSale) throw new Error('Party is already for sale.');
    this._ticketLimit = ticketLimit;
    this._startSaleAt = startSaleAt;
  }

  public changeTicketLimit(limit: number) {
    if (!this.isForSale) throw new Error('Party is not for sale.');
    this._ticketLimit = limit;
  }

  public changeStartSaleAt(startSaleAt: ZonedDateTime) {
    if (!this.isForSale) throw new Error('Party is not for sale.');
    this._startSaleAt = startSaleAt;
  }
}
