import { IsUlid } from '@lib/validation/isUlid';
import {
  IsString,
  MaxLength,
  MinLength,
  validateOrReject,
} from 'class-validator';

export class UpdateNameCommand {
  @IsUlid({ message: 'Invalid info id' })
  public readonly infoId: string;

  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50, { message: 'Name must be less than 50 characters long' })
  public readonly name: string;

  constructor(infoId: string, name: string) {
    this.infoId = infoId;
    this.name = name;
    validateOrReject(this);
  }
}
