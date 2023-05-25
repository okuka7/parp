import { IsUlid } from '@lib/validation/isUlid';
import { IsString, MinLength, validateOrReject } from 'class-validator';

export class UpdateDetailCommand {
  @IsUlid({ message: 'Invalid info id' })
  public readonly infoId: string;

  @IsString({ message: 'Description must be a string.' })
  @MinLength(10, { message: 'Description must be at least 1 character.' })
  public readonly description: string;

  @IsString({ message: 'Notes must be a string' })
  @MinLength(10, { message: 'Notes must be at least 10 characters long' })
  public readonly notes: string;

  constructor(infoId: string, description: string, notes: string) {
    this.infoId = infoId;
    this.notes = notes;
    this.description = description;
    validateOrReject(this);
  }
}
