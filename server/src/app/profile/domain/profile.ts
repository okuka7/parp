import { User } from '@common/mikro-orm/entity/user.entity';
import { OneToOne, Property } from '@mikro-orm/core';

export class Profile {
  @OneToOne(() => User, { primary: true })
  user!: User;

  @Property()
  name!: string;
}
