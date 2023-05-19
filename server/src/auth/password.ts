import { User } from '@common/mikro-orm/entity/user.entity';
import { ZonedDateTimeType } from '@common/mikro-orm/type/js-joda';
import { ZonedDateTime } from '@js-joda/core';
import { Entity, OneToOne, Property, Reference } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Entity()
export class Password {
  @OneToOne(() => User, { primary: true })
  user!: User;

  @Property()
  password!: string;

  @Property({ type: ZonedDateTimeType, onUpdate: () => ZonedDateTime.now() })
  updatedAt: ZonedDateTime = ZonedDateTime.now();

  static create(userId: string, password: string): Password {
    const instance = new Password();
    instance.user = Reference.createFromPK(User, userId);
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
