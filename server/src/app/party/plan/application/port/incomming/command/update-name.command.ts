import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  validateOrReject,
} from 'class-validator';

export class UpdateNameCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  public readonly partyId: string;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be less than 50 characters long' })
  public readonly name: string;

  constructor(partyId: string, name: string) {
    this.partyId = partyId;
    this.name = name;
    validateOrReject(this);
  }
}
