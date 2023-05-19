import { User } from '@common/mikro-orm/entity/user.entity';
import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class Auth {
  @OneToOne(() => User, { primary: true })
  user!: User;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  phoneNumber!: string;

  @Enum({ items: () => Role })
  role: Role = Role.USER;

  static create(user: User, email: string, phoneNumber: string): Auth {
    const instance = new Auth();
    instance.user = user;
    instance.email = email;
    instance.phoneNumber = phoneNumber;
    return instance;
  }

  static createAdmin(user: User, email: string, phoneNumber: string): Auth {
    const instance = new Auth();
    instance.user = user;
    instance.email = email;
    instance.phoneNumber = phoneNumber;
    instance.role = Role.ADMIN;
    return instance;
  }
}
