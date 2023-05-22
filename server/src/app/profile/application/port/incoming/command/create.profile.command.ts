import { IsUlid } from '@lib/validation/isUlid';
import { MinLength, validateSync } from 'class-validator';

export class CreateProfileCommand {
  @IsUlid()
  userId: string;

  @MinLength(3, { message: 'Invalid name' })
  name: string;

  constructor(userId: string, name: string) {
    this.userId = userId;
    this.name = name;
    validateSync(this);
  }
}
