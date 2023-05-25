import { Money } from '@common/value';
import {
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
  validateOrReject,
} from 'class-validator';

export class ChangePriceCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsInt({ message: 'Option id is not integer.' })
  @Min(0, { message: 'Option price is negative.' })
  readonly optionNo: number;

  @ValidateNested()
  readonly price: Money;

  constructor(partyId: string, optionNo: number, price: Money) {
    this.partyId = partyId;
    this.optionNo = optionNo;
    this.price = price;
    validateOrReject(this);
  }
}
