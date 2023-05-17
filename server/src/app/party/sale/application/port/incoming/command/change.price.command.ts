import { Money } from '@common/value';
import { IsInt, IsUUID, Min, validate } from 'class-validator';

export class ChangePriceCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsInt({ message: 'Option id is not integer.' })
  @Min(0, { message: 'Option price is negative.' })
  readonly optionId: number;

  readonly price: Money;

  constructor(partyId: string, optionId: number, price: Money) {
    this.partyId = partyId;
    this.optionId = optionId;
    this.price = price;
    validate(this);
  }
}
