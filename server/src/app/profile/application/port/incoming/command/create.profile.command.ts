<<<<<<< HEAD
import { IsUUID, MinLength, validateSync } from 'class-validator';

export class CreateProfileCommand {
  @IsUUID(4, { message: 'Invalid user id' })
=======
import { IsUlid } from '@lib/validation/isUlid';
import { MinLength, validateSync } from 'class-validator';

export class CreateProfileCommand {
  @IsUlid()
>>>>>>> ab0c1db (feat: uuid to ulid)
  userId: string;

  @MinLength(3, { message: 'Invalid name' })
  name: string;

<<<<<<< HEAD
  constructor(user: string, name: string) {
    this.userId = user;
=======
  constructor(userId: string, name: string) {
    this.userId = userId;
>>>>>>> ab0c1db (feat: uuid to ulid)
    this.name = name;
    validateSync(this);
  }
}
