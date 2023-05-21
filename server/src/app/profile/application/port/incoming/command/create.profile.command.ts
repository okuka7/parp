import { IsUUID, MinLength, validateSync } from 'class-validator';

export class CreateProfileCommand {
  @IsUUID(4, { message: 'Invalid user id' })
  userId: string;

  @MinLength(3, { message: 'Invalid name' })
  name: string;

  constructor(user: string, name: string) {
    this.userId = user;
    this.name = name;
    validateSync(this);
  }
}
