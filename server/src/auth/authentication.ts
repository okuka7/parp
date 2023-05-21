import { User } from '@common/mikro-orm/entity/user.entity';
import { Entity, Enum, OneToOne, Property } from '@mikro-orm/core';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class Auth {
  @OneToOne(() => User, { primary: true, mapToPk: true })
  userId!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  phoneNumber!: string;

  @Enum({ items: () => Role })
  role: Role = Role.USER;

  static create(userId: string, email: string, phoneNumber: string): Auth {
    const instance = new Auth();
    instance.userId = userId;
    instance.email = email;
    instance.phoneNumber = phoneNumber;
    return instance;
  }

  static createAdmin(userId: string, email: string, phoneNumber: string): Auth {
    const instance = new Auth();
    instance.userId = userId;
    instance.email = email;
    instance.phoneNumber = phoneNumber;
    instance.role = Role.ADMIN;
    return instance;
  }
}
