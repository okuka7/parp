import { validate } from 'uuid';

export class RebalanceLimitCommand {
  constructor(
    readonly partyId: string,
    readonly optionId: number,
    readonly limit: number,
  ) {
    this.validIds();
    this.validLimit();
  }

  private validIds(): void {
    if (validate(this.partyId)) throw new Error('Invalid party id');
    if (this.optionId < 0) throw new Error('Invalid option id');
  }

  private validLimit(): void {
    if (this.limit < 0) throw new Error('Invalid limit');
  }
}
