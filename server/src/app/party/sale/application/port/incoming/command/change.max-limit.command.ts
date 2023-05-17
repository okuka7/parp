import { IsInt, IsPositive, IsUUID, validateSync } from 'class-validator';

export class ChangeMaxLimitCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsInt({ message: 'Max limit is not integer.' })
  @IsPositive({ message: 'Max limit is not positive.' })
  readonly maxLimit: number;

  constructor(partyId: string, maxLimit: number) {
    this.partyId = partyId;
    this.maxLimit = maxLimit;
    validateSync(this);
  }
}
