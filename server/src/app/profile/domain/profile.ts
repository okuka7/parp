import { User } from '@common/mikro-orm/entity/user.entity';
import { OneToOne, Property } from '@mikro-orm/core';

export class Profile {
  @OneToOne({ type: () => User, primary: true, mapToPk: true })
  userId!: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  avatar?: string;

  public static create(userId: string, name: string) {
    const profile = new Profile();
    profile.userId = userId;
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
