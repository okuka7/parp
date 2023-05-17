import { IsString, IsUUID, MinLength, validateOrReject } from 'class-validator';

export class UpdateNotesCommand {
  @IsUUID('4', { message: 'Invalid party id.' })
  public readonly partyId: string;

  @IsString({ message: 'Notes must be a string' })
  @MinLength(10, { message: 'Notes must be at least 10 characters long' })
  public readonly notes: string;

  constructor(partyId: string, notes: string) {
    this.partyId = partyId;
    this.notes = notes;
    validateOrReject(this);
  }
}
