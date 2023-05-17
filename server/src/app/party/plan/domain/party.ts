import { Address } from '@common/value';
import { ZonedDateTime } from '@js-joda/core';

export class Party {
  constructor(
    private _id: string,
    private _name: string,
    private _description: string,
    private _notes: string,
    private _date: ZonedDateTime,
    private _location: Address,
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get notes(): string {
    return this._notes;
  }

  public get date(): ZonedDateTime {
    return this._date;
  }

  public get location(): Address {
    return this._location;
  }

  public updateName(name: string): void {
    this._name = name;
  }

  public updateDescription(description: string): void {
    this._description = description;
  }

  public updateNotes(notes: string): void {
    this._notes = notes;
  }

  public changeDate(date: ZonedDateTime): void {
    this._date = date;
  }

  public changeLocation(location: Address): void {
    this._location = location;
  }
}
