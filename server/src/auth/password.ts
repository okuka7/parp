import { ZonedDateTime } from '@js-joda/core';
import { UpdatedAt } from '@lib/decorator/db.time.decorator';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { PasswordRepository } from './password.repository';

@Entity({ schema: 'auth', customRepository: () => PasswordRepository })
export class Password {
  @PrimaryKey({ length: 26 })
  userId!: string;

  @Property()
  password!: string;

  @UpdatedAt()
  updatedAt: ZonedDateTime;

  static create(userId: string, password: string): Password {
    const instance = new Password();
    instance.userId = userId;
    const salt = bcrypt.genSaltSync();
    instance.password = bcrypt.hashSync(password, salt);
    return instance;
  }

  compare(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  update(password: string): void {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(password, salt);
  }
}
