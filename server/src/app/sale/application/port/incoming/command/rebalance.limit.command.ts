import { IsUlid } from '@lib/validation/isUlid';
import {
  IsArray,
  IsInt,
  Min,
  ValidateNested,
  validateOrReject,
} from 'class-validator';

export class RebalanceLimitCommand {
  @IsUlid({ message: 'Invalid party id' })
  readonly partyId: string;

  @IsArray({ message: 'Options must be array' })
  @ValidateNested({ each: true })
  readonly options: Option[];

  constructor(partyId: string, options: Option[]) {
    this.partyId = partyId;
    this.options = options;
    validateOrReject(this);
  }
}

class Option {
  @IsInt({ message: 'Option ID must be integer' })
  @Min(0, { message: 'Option ID must be positive' })
  readonly optionNo: number;

  @IsInt({ message: 'Limit must be integer' })
  @Min(0, { message: 'Limit must be positive' })
  readonly maxCount: number;

  constructor(optionNo: number, maxCount: number) {
    this.optionNo = optionNo;
    this.maxCount = maxCount;
    validateOrReject(this);
  }
}
