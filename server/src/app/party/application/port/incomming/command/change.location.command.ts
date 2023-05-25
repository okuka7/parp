import { Address } from '@common/value';
import { IsUlid } from '@lib/validation/isUlid';
import { ValidateNested, validateOrReject } from 'class-validator';

export class ChangeLocationCommand {
  @IsUlid({ message: 'Invalid party id' })
  readonly partyId: string;

  @ValidateNested()
  readonly address: Address;

  constructor(partyId: string, address: Address) {
    this.partyId = partyId;
    this.address = address;
    validateOrReject(this);
  }
}
