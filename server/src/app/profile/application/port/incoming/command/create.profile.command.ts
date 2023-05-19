import { User } from '@common/mikro-orm/entity/user.entity';
import { MinLength, validateSync } from 'class-validator';

export class CreateProfileCommand {
  user: User;

  @MinLength(3, { message: 'Invalid name' })
  name: string;

  constructor(user: User, name: string) {
    this.user = user;
    this.name = name;
    validateSync(this);
  }
}
