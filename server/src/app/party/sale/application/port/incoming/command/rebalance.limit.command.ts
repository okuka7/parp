import {
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
  validateOrReject,
} from 'class-validator';

export class RebalanceLimitCommand {
  @IsUUID(4, { message: 'Party ID must be UUID v4' })
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
  readonly optionId: number;

  @IsInt({ message: 'Limit must be integer' })
  @Min(0, { message: 'Limit must be positive' })
  readonly limit: number;

  constructor(optionId: number, limit: number) {
    this.optionId = optionId;
    this.limit = limit;
    validateOrReject(this);
  }
}
