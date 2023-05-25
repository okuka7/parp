import {
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
  validate,
} from 'class-validator';

export class ChangeOptionNameCommand {
  @IsUUID('4', { message: 'Party id is not uuid.' })
  readonly partyId: string;

  @IsPositive({ message: 'Option id is not positive.' })
  readonly optionId: number;

  @IsString({ message: 'Option name is not string.' })
  @MinLength(1, { message: 'Option name is empty.' })
  readonly name: string;

  constructor(partyId: string, optionId: number, name: string) {
    this.partyId = partyId;
    this.optionId = optionId;
    this.name = name;
    validate(this);
  }
}
