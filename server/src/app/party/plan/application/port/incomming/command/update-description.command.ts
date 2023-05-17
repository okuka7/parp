import { IsString, IsUUID, MinLength, validateOrReject } from 'class-validator';

export class UpdateDescriptionCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  public readonly partyId: string;

  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  public readonly description: string;

  constructor(partyId: string, description: string) {
    this.partyId = partyId;
    this.description = description;
    validateOrReject(this);
  }
}
