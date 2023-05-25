import { Money } from '@common/value';
import {
  IsArray,
  IsInt,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
  validateOrReject,
} from 'class-validator';

export class AddOptionCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsArray()
  @ValidateNested({ each: true })
  readonly options: OptionInfo[];

  constructor(partyId: string, options: OptionInfo[]) {
    this.partyId = partyId;
    this.options = options;
    validateOrReject(this);
  }
}

class OptionInfo {
  @IsString({ message: 'Option name is not string.' })
  @MinLength(1, { message: 'Option name is empty.' })
  readonly name: string;

  @ValidateNested()
  readonly price: Money;

  @IsInt({ message: 'Option quantity is not integer.' })
  readonly maxCount: number;
}
