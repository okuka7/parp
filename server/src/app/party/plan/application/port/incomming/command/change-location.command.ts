import { Address } from '@common/value';
import { IsUUID, ValidateNested, validateOrReject } from 'class-validator';

export class ChangeLocationCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  readonly partyId: string;

  @ValidateNested()
  readonly location: Address;

  constructor(partyId: string, location: Address) {
    this.partyId = partyId;
    this.location = location;
    validateOrReject(this);
  }
}
