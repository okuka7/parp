import { ZonedDateTime } from '@js-joda/core';
<<<<<<< HEAD
import { Entity, OneToOne, Property } from '@mikro-orm/core';
=======
import { UpdatedAt } from '@lib/decorator/db.time.decorator';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
>>>>>>> ab0c1db (feat: uuid to ulid)
import * as bcrypt from 'bcrypt';

@Entity({ schema: 'auth' })
export class Password {
<<<<<<< HEAD
  @OneToOne(() => User, { primary: true, mapToPk: true })
=======
  @PrimaryKey({ length: 26 })
>>>>>>> ab0c1db (feat: uuid to ulid)
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
