import { IsUlid } from '@lib/validation/isUlid';
import { validateOrReject } from 'class-validator';

export class CancelPartyCommand {
  @IsUlid({ message: 'Invalid party id' })
  readonly partyId: string;

  constructor(partyId: string) {
    this.partyId = partyId;
    validateOrReject(this);
  }
}
