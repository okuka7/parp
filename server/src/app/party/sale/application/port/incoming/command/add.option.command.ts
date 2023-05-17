import { Money } from '@common/value';
import { IsInt, IsString, IsUUID, MinLength, validate } from 'class-validator';

export class AddOptionCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsString({ message: 'Option name is not string.' })
  @MinLength(1, { message: 'Option name is empty.' })
  readonly name: string;

  readonly price: Money;

  @IsInt({ message: 'Option quantity is not integer.' })
  readonly maxCount: number;

  constructor(partyId: string, name: string, price: Money, maxCount: number) {
    this.partyId = partyId;
    this.name = name;
    this.price = price;
    this.maxCount = maxCount;
    validate(this);
  }
}
