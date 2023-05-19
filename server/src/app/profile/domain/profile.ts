import { User } from '@common/mikro-orm/entity/user.entity';
import { OneToOne, Property } from '@mikro-orm/core';

export class Profile {
  @OneToOne(() => User, { primary: true })
  user!: User;

  @Property()
  name!: string;

  @Property({ nullable: true })
  avatar?: string;

  public static create(user: User, name: string) {
    const profile = new Profile();
    profile.user = user;
    profile.name = name;
    return profile;
  }

  public changeName(name: string) {
    this.name = name;
  }

  public changeAvatar(avatar: string) {
    this.avatar = avatar;
  }
}
