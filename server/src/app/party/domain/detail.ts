import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class Detail {
  private readonly _detail!: string;
  private readonly _notes!: string;

  constructor(detail: string, notes: string) {
    this._detail = detail;
    this._notes = notes;
  }

  @Property({ type: 'text' })
  get detail(): string {
    return this._detail;
  }

  @Property({ type: 'text' })
  get notes(): string {
    return this._notes;
  }
}
