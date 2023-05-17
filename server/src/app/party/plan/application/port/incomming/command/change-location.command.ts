import { Address } from '@common/value';
import { IsInstance, IsUUID, validateOrReject } from 'class-validator';

export class ChangeLocationCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  readonly partyId: string;

  @IsInstance(Address, { message: 'Invalid location.' })
  readonly location: Address;

  constructor(partyId: string, location: Address) {
    this.partyId = partyId;
    this.location = location;
    validateOrReject(this);
  }
}
