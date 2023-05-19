import { ZonedDateTimeType } from '@common/mikro-orm/type/js-joda';
import { ZonedDateTime } from '@js-joda/core';
import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Group } from '../group/domain/group';

@Entity()
export class Party {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => Group)
  group!: Group;

  @Property({ type: ZonedDateTimeType, nullable: true })
  deletedAt: ZonedDateTime | null = null;

  static create(group: Group): Party {
    const instance = new Party();
    instance.group = group;
    return instance;
  }
}
