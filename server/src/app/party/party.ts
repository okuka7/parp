import { ZonedDateTime } from '@js-joda/core';
import { DeletedAt } from '@lib/decorator/db.time.decorator';
import { PrimaryUlid } from '@lib/decorator/db.ulid.decorator';
import { Entity, ManyToOne } from '@mikro-orm/core';
import { ulid } from 'ulid';
import { Group } from '../group/domain/group';

@Entity()
export class Party {
  @PrimaryUlid()
  id: string = ulid();

  @ManyToOne(() => Group, { mapToPk: true })
  groupId!: string;

  @DeletedAt()
  deletedAt: ZonedDateTime | null = null;

  static create(groupId: string): Party {
    const instance = new Party();
    instance.groupId = groupId;
    return instance;
  }
}
